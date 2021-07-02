---
title: Next.js getStaticChildComponentProps
date: "2021-06-01"
description: A way to "getStaticProps" for child components when using Next.js
author: [Sam Hopkins]
type: Blog
tags: ['Next.js']
---
#### Introduction

With the help of [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation) and [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation), [Next.js](https://nextjs.org/) enables you to statically generate the HTML of pages within your website. This is particularly useful for “Static content” pages, where the content originates from a Headless CMS or api endpoint. Generating these static HTML documents, which can then be cached by CDNs, makes these pages super fast to load and means that you don’t need to run any client-side JavaScript.

However, these two functions `getStaticPaths` and `getStaticProps` have a limitation. They can only be run at the very top level page component. This makes things difficult if you have a child component which also needs to call a content api to fetch data specific to that page. For example in a “Related Content” component.

On a recent project, we found a way round this by *double rendering* the page during it’s static build. In the following article, I’ll run you through how we did it.

#### Further background into our use case:

We were building product pages for a travel website, their product being holidays. Each holiday had data tags assigned specifying the Continent, Country, City/Town, Landmarks, Rivers, Holiday Type, Events, Experiences etc related to that holiday. 

On these product pages we had a component pulling in related blog articles to that holiday and also another component pulling in other similar/related holidays. This relation was done by querying the CMS for content articles which had the same data tags as the product.

We also wanted to “weight” these results based on the specificity of the data tag. So “Continent” not being very specific would have a “relevance score” of only 1 whereas a City or Town being more specific would have a “relevance score” of 2. Event and Experience were given an even higher weighting of 3.

*Note: You will notice in the code that we refer to content items as “stories”. This was in line with our Headless CMS [Storyblok](https://www.storyblok.com/) where content items are referred to as stories.*

#### How we did it:

As I mentioned before, the solution involves *double rendering* the app during the static build of the page. But you can think of it happening in 3 main steps:

1. On the first render we gather the data tags that we want to request, adding them to a global JavaScript variable. 
2. We go and fetch content pages which also have these data tags from the CMS. We then add these content pages to the static props injected in the page for the 2nd render
3. These content pages are added to a context at the top level of the page which can then be consumed by the `RelatedBlog` or `RelatedProduct` child components

#### 1. Gather Requested Data Tags:

In the below code snippet you can see that if there is no related content for each of the data tags in the context already, then add the data tags for the current content page to the `global.__next_related_stories_requested_tags` array

```js
// related-stories.js
export default function RelatedStories({
 content,
 relatedStoriesType,
 children
}) {
 const relatedContentData = useContext(RelatedStoriesContext);
 
 const dataTagListForCurrentStory = extractDataTagArray(content);
 
 const relatedContentForDataTagNotFoundInContext =
   !relatedContentData[relatedStoriesType] ||
   dataTagListForCurrentStory.find(
     dataTag =>
       relatedContentData[relatedStoriesType][dataTag.fmid] == undefined
   );
 
 if (!relatedContentForDataTagNotFoundInContext) {
   // aggregate related stories into array sorted by relevance score
   const relatedStories = getRelatedStories(
     content,
     relatedContentData[relatedStoriesType]
   );
   // render related stories
   return children(relatedStories);
 }
 
 const IS_SSG =
   typeof window === "undefined" &&
   typeof global !== "undefined" &&
   global.__next_related_stories_requested_tags;
 
 // data not ready, still in SSG, push data tag fmids to requested array
 if (IS_SSG) {
   dataTagListForCurrentStory.forEach(dataTag => {
     global.__next_related_stories_requested_tags.push(dataTag.fmid);
   });
 }
 
 return null;
}
```

#### 2. Fetch the content related to the requested data tags:

Now in the next code snippet, you can see how we have triggered that initial render using `ReactDOMServer.renderToStaticMarkup(...);`. After this initial render we have the requested data tags in the global object. We then take these tags and make a call to our CMS to get all of the “stories” (content pages) that also have these data tags. 

When all the content page results are returned we add our related products and our related blogs to the props object, which gets returned from this function.

```js
// get-related-stories-static-props.js
export default async (Page, existingProps) => {
 const ReactDOMServer = require("react-dom/server");
 const props = {
   __next_related_stories_data: { blogs: {}, products: {} },
   ...existingProps
 };
 
 global.__next_related_stories_requested_tags = [];
 ReactDOMServer.renderToStaticMarkup(<Page {...props} />);
 
 // dedupe data tags
 const dataTagIds = Array.from(
   new Set(global.__next_related_stories_requested_tags)
 );
 
 try {
   // fetch stories with each requested tag and save in props
   await Promise.all(
     dataTagIds.map(async fmid => {
       // detect if fmid exists in blogs/products object and extract stories from results and add to props
       if (!props.__next_related_stories_data.blogs[fmid]) {
         const storiesWithDataTag = await getStoryByDataTagId(fmid);
         const storiesTypeWithDataTag = storiesWithDataTag.filter(
           story => story.full_slug.split("/")[0] === "blogs"
         );
 
         props.__next_related_stories_data.blogs[
           fmid
         ] = storiesTypeWithDataTag;
       }
 
       if (!props.__next_related_stories_data.products[fmid]) {
         const storiesWithDataTag = await getStoryByDataTagId(fmid);
         const storiesTypeWithDataTag = storiesWithDataTag.filter(
           story => story.full_slug.split("/")[0] === "products"
         );
 
         props.__next_related_stories_data.products[
           fmid
         ] = storiesTypeWithDataTag;
       }
     })
   );
 } catch (err) {
   return { __next_related_stories_error: err || null };
 }
 
 return props;
};
```

In the next code snippet you can see that we invoke this function within `getStaticProps` on the top level page component. After running this function you can see that the props passed in to the top page component will now contain all our related content fetched from our CMS.

```js
// pages/[...slug].js
const Page = withRelated(({ page, preview, devMode }) => {
 let story = useStoryblok(page, preview);
 return (
   <ThemeProvider>
     <Head>
       <title>App</title>
     </Head>
     <PreviewIndicator dev={devMode} />
     <Components {...story.content} key={story.content._uid} />
   </ThemeProvider>
 );
});
 
export default Page;
 
export async function getStaticProps({ params = {}, preview }) {
 const isPreview = preview || false;
 let slug = params.slug ? params.slug.join("/") : "home";
 
 let { data } = await Storyblok.get(`cdn/stories/${slug}`, sbParams);
 
 let props = {
   page: data.story || {},
   preview: isPreview,
   devMode: process.env.NODE_ENV == "development"
 };
 
 // Go and get related stories data and add to props
 props = await getRelatedStaticProps(Slug, props);
 
 return {
   props,
   revalidate: 10
 };
}
 
export async function getStaticPaths() {
 let { data } = await Storyblok.get("cdn/links/");
 let paths = [];
 
 Object.keys(data.links).forEach(link => {
   if (data.links[link].is_folder || data.links[link].slug === "home") return;
   paths.push({ params: { slug: data.links[link].slug.split("/") } });
 });
 
 return {
   paths,
   fallback: "blocking"
 };
}
```

#### 3. Add data to a context so that it can be accessed by child components

In the last code snippet you will see that we are wrapping the page in “withRelated()”, this is a HOC which wraps the page in a context. We pass the the related story results into the context provider so it can be accessed by any child component.

This simple context shown in the snippet below:

```js
// contexts/with-related.js
const withRelated = Component => props => {
 if (props.__next_ssg_error) return <h1>{props.__next_ssg_error} Error</h1>;
 
 return (
   <RelatedStoriesContext.Provider
     value={props.__next_related_stories_data || {}}
   >
     <Component {...props} />
   </RelatedStoriesContext.Provider>
 );
};
 
export default withRelated;
```

If you then go back and see the first code snippet in this article, you will see that when this `related-stories.js` is rendered the second time it will have found all the data tags needed within the “RelatedStoriesContext”.

We then aggregate all the results, refining them into one de-duped array of, in this case, blog content articles sorted by “relevance score”. We can then use the following component to render them. We are just showing the three with the highest relevance.

```js
// components/RelatedBlogs.js
const RelatedBlogs = ({ content }) => {
 return (
   <RelatedStories content={content} relatedStoriesType={"blogs"}>
     {relatedBlogs =>
       !!relatedBlogs.length && (
         <Section heading="You might also like" centered={true} gridWidth={12}>
           <GridContainer>
             <Grid container spacing={3}>
               {relatedBlogs.slice(0, 3).map(blog => (
                 <Grid item sm={12} md={4} key={`blog-${blog.id}`}>
                   <BlogTile content={blog.content} />
                 </Grid>
               ))}
             </Grid>
           </GridContainer>
         </Section>
       )
     }
   </RelatedStories>
 );
};
 
export default RelatedBlogs;
```

#### Conclusion:

With this solution you can see that the limitation of not being able to run `getStaticProps` on child components isn’t really a blocker. By double rendering the component during static build, you can gather the data required for the child components within your top level `getStaticProps`. This data can then be passed down and access by any of your child component via use of the context.

As the adoption of Next.js static websites grows I can see this being a very useful pattern in various use cases. I hope this article helps but also feel free to reach out to [me](mailto:samuel.hopkins@and.digital) if you have any queries.