---
title: "Carbonite: Contributor Guide"
date: "2021-01-02"
description: "A guide for contributors to create new blog entries"
author: Nathan Skelley
type: Guide
---

The aim here is for us to create a detailed and deep collection of knowledge that any and all Turing ANDis can contribute to and learn from. Some may be mainly contributors, some may mainly just learn from it and contribute hardly anything at all, both are fine, as well as everything in between. We’re all here to learn and help each other.
Carbonite is currently just a simple Gatsby app that turns markdown blog entries into pages at build time - to make a new page, just add a new blog entry. This guide should tell you everything you need to know to contribute, but if things still don’t make sense, just talk to Nathan Skelley, the current maintainer (he’s not very scary).
Before you set off, be aware that this guide describes only how to create blog pages by adding content, it does not cover changes to the actual source code of Carbonite. For this, talk to Skelley.

### Creating New Blog Entries

All blog entries live within the content/blog folder. to add a new blog post, just create a new sub-folder with an index.md file in it, and there you go, instant blog! From there, you can write in markdown and Gatsby will convert it into page for you. From within your markdown, you can use all the expected syntax (the section below will cover your options in more detail), and refer to other assets in your blog folder as well.

This means that a standard blog post with a few images might have a folder structure like this:

```md
src/content
    - blog
        - my-new-blog-entry // this will be the url slug for the blog page
            - index.md
            - image_1.jpg
            _ image_2.jpg
        ...otherBlogEntries
```

Once the files have been saved, they will show in the site index and be available as full blog pages, which will be visible when running gatsby develop.

### Frontmatter

Frontmatter is used to provide metadata for the blog entry. It’s found at the top of an entry between three dashes ---. This section contains important information that describes the entry, such as it’s title, date, author etc. These elements can be accessed via graphQL page queries and used when rendering components.

```md
title: "Carbonite: Contributor Guide"
date: "2021-01-02"
description: "The contributor guide for Carbonite"
author: Nathan Skelley
type: Guide
```

### Markdown Syntax

Below are examples of the Markdown syntax. 

#### Headers

```md
# Header 1  // don't use this, the page title is the only h1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6
```
# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6


#### Quotes

```md
> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
```

> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

#### Lists

```md
- Red
- Green
- Blue

<br/>

* Red
* Green
* Blue

<br/>

- Red
- Green
- Blue
```

- Red
- Green
- Blue

<br/>

* Red
* Green
* Blue
  
<br/>

- Red
- Green
- Blue

```md
1. Buy flour and salt
2. Mix together with water
3. Bake
```

1. Buy flour and salt
2. Mix together with water
3. Bake

#### Links

```md
This is [an example](http://example.com "Example") link.

[This link](http://example.com) has no title attr.

This is [an example] [id] reference-style link.

[id]: http://example.com "Optional Title"
```

This is [an example](http://example.com "Example") link.

[This link](http://example.com) has no title attr.

This is [an example][id] reference-style link.

[id]: http://example.com "Optional Title"

#### Images

```md
![Happy Labrador](./happy-lab.jpg)
```

![Happy Labrador](./happy-lab.jpg)

#### Text Decoration

```md
*single asterisks*

_single underscores_

**double asterisks**

__double underscores__
```

_single asterisks_

_single underscores_

**double asterisks**

**double underscores**

#### Tables

```md
Tables
| Number | Title                                    | Year |
| :----- | :--------------------------------------- | ---: |
| 1      | Harry Potter and the Philosopher’s Stone | 2001 |
| 2      | Harry Potter and the Chamber of Secrets  | 2002 |
| 3      | Harry Potter and the Prisoner of Azkaban | 2004 |
```

| Number | Title                                    | Year |
| :----- | :--------------------------------------- | ---: |
| 1      | Harry Potter and the Philosopher’s Stone | 2001 |
| 2      | Harry Potter and the Chamber of Secrets  | 2002 |
| 3      | Harry Potter and the Prisoner of Azkaban | 2004 |

#### Code

**JavaScript**

    ```js
    const hello = () => {console.log("HELLO!")}

    hello()
    ```

```js
const hello = () => {console.log("HELLO!")}

hello()
```

**JSX (React)**

    ```JSX
    const Component = ({string, upperCase}) => {

        let value = upperCase ? string.toUpperCase() : string;

        return <p>{string}</p>;

    }
    ```

```JSX
const Component = ({string, upperCase}) => {

    let value = upperCase ? string.toUpperCase() : string;

    return <p>{string}</p>;

}
```

**TypeScript**

    ```ts
    const hello = (input: string):string => {
        return input.toLowerCase();
    }

    hello('HELLO THERE'); // hello there
    ```

```ts
const hello = (input: string):string => {
    return input.toLowerCase();
}

hello('HELLO THERE'); // hello there
```
