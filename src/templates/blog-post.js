import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  Container,
  Divider,
  Box,
  makeStyles,
  Typography,
  Chip,
} from "@material-ui/core"
// Highlighting for code blocks
import "prismjs/themes/prism-okaidia.css"

const useStyles = makeStyles(theme => ({
  post: {
    "& *": {
      ...theme.typography.body1,
      fontWeight: undefined
    },
    "& li": {
      margin: theme.spacing(3,0)
    },
    "& img": {
      maxWidth: '100%'
    },
    "& h1": theme.typography.h1,
    "& h2": theme.typography.h2,
    "& h3": {
      ...theme.typography.h3,
      borderBottom: `solid 1px ${theme.palette.divider}`,
      paddingBottom: theme.spacing(1),
      marginBottom: theme.spacing(4)
    },
    "& h4": {
      ...theme.typography.h4,
      marginBottom: theme.spacing(2)
    },
    "& h5": theme.typography.h5,
    "& h6": theme.typography.h6,
    "& a": {
      color: theme.palette.secondary.main,
      fontWeight: 700,
      textDecoration: "none",
    },
    "& code":{
      padding: `0.1em 0.4em !important`, 
      fontSize: '0.9em !important'
    },
    "& blockquote": {
      margin: theme.spacing(5, 0),
      borderLeft: `solid ${theme.palette.grey[400]} 6px`,
      padding: theme.spacing(0, 3),
      "& p": {
        fontFamily: "Poppins",
        fontSize: "1.1rem",
        fontWeight: 700,
        color: theme.palette.grey[600],
        fontStyle: "italic",
      },
    },
    "& .gatsby-resp-image-wrapper":{
      boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      maxWidth: 'none'
    },
    "& .centeredContainer": {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    "& table": {
      alignSelf: 'center',
      borderCollapse: 'collapse',
      margin: '50px auto',
      "& th": {
        backgroundColor: theme.palette.secondary.main,
        padding: '0 20px',
        color: "white",
        border: `solid 1px ${theme.palette.divider}`
      },
      "& td": {
        border: `solid 1px ${theme.palette.divider}`
      },
    }
  },
  buttonWrapper: {
    display: `flex`,
    flexWrap: `wrap`,
    justifyContent: `space-between`,
    listStyle: `none`,
    padding: 0,
  },
  button: {
    textDecoration: "none",
    color: "white",
    fontSize: "1.1rem",
    fontWeight: 700,
    fontFamily: "Poppins",
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create("box-shadow"),
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    "&:hover": {
      boxShadow: "rgba(100, 100, 111, 0.4) 0px 7px 29px 0px",
    },
  },
  chip: {
    margin: theme.spacing(0.5),
    fontFamily: theme.typography.h6.fontFamily,
  },
}))

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const tags = post.frontmatter.tags

  const classes = useStyles()

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Container maxWidth="md">
        <Box my={4}>
          <Box component="header" mb={6} textAlign="center">
            <Box py={1} clone>
              <Typography variant="h2" component="h1">
                {post.frontmatter.title}
              </Typography>
            </Box>
            <Box py={1} clone>
              <Typography variant="body2" color="textSecondary">
                {`${post.frontmatter.author} on ${post.frontmatter.date} - ${post.timeToRead} min read`}
              </Typography>
            </Box>
            {tags && (
              <Box mx={-0.5} py={1}>
                {post.frontmatter.tags.map(tag => (
                  <Chip
                    size="small"
                    label={tag}
                    className={classes.chip}
                    color="secondary"
                  />
                ))}
              </Box>
            )}
            <Divider variant="middle" />
          </Box>
          <section
            dangerouslySetInnerHTML={{ __html: post.html }}
            className={classes.post}
          />
        </Box>
        <Box component="nav" my={8}>
          <ul className={classes.buttonWrapper}>
            <li>
              {previous && (
                <Link
                  to={previous.fields.slug}
                  rel="prev"
                  className={classes.button}
                >
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link
                  to={next.fields.slug}
                  rel="next"
                  className={classes.button}
                >
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </Box>
      </Container>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        author
        tags
      }
      timeToRead
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
