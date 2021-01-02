import React from "react"
import { graphql } from "gatsby"
import { Container, Grid, Typography, Box } from "@material-ui/core"
import SEO from "../components/seo"
import Layout from "../components/layout"
import BlogCard from "../components/blogCard"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Container maxWidth="md">
        <Box my={8}>
          <Box mb={4}>
            <Typography variant="h4" gutterBottom>
              Welcome to Carbonite
            </Typography>
            <Typography variant="body1" paragraph>
              This is a space where we can all share our knowledge and
              contribute to the collective capability of Turing. It's mission is
              to create a single shared place where we can store what we
              consider to be best practice, experiment and showcase new and
              upcoming technologies, and provide examples that can easily be
              used by other ANDis to provide outstanding experiences.
            </Typography>
            <Typography variant="body1">
              This is very much a first draft to be used as an example, but if
              you'd like to contribute, check out the <b>Contributor Guide</b>.
              To see where Carbonite intends to go next, check out the
              <b> Roadmap</b> blog entry.
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {posts.map(post => (
              <Grid item xs={12}>
                <BlogCard
                  slug={post.fields.slug}
                  title={post.frontmatter.title || post.fields.slug}
                  date={post.frontmatter.date}
                  timeToRead={post.timeToRead}
                  description={post.frontmatter.description || post.excerpt}
                  author={post.frontmatter.author}
                  inProgress={post.frontmatter.inProgress}
                  tags={post.frontmatter.tags}
                  type={post.frontmatter.type}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          author
          inProgress
          tags
          type
        }
        timeToRead
      }
    }
  }
`
