import React from "react"
import { graphql } from "gatsby"
import { Box, Container, Grid } from "@material-ui/core"
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
