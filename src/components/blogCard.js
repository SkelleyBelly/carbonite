import React from "react"
import { Link } from "gatsby"
import {
  Box,
  ButtonBase,
  Card,
  Chip,
  makeStyles,
  Typography,
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  card: {
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    "&:hover": {
      boxShadow: "rgba(100, 100, 111, 0.4) 0px 7px 29px 0px",
    },
  },
  inProgress: {
    border: "dashed rgba(0,0,0,0.5) 4px",
    opacity: 0.8,
    borderRadius: "16px",
  },
  chip: {
    margin: theme.spacing(0.5),
    fontFamily: theme.typography.h6.fontFamily,
  },
  author: {
    width: "40%",
    marginLeft: "auto",
  },
  buttonBase: {
    textAlign: "left",
    width: "100%",
    "& *": {
      cursor: "pointer",
    },
  },
}))

const BlogCard = ({
  slug,
  title,
  date,
  timeToRead,
  description,
  author,
  inProgress,
  tags,
  type,
}) => {
  const classes = useStyles()

  if (inProgress)
    return (
      <Box p={4} width="100%" className={classes.inProgress}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">{title}</Typography>
          {type && (
            <Chip label={type} variant="outlined" className={classes.chip} />
          )}
        </Box>
        <Typography variant="caption" color="textSecondary">
          {`In Progress as of ${date}`}
        </Typography>
        <Box py="1em" clone>
          <Typography variant="body1">{description}</Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {tags && (
            <Box width="60%" m={-0.5}>
              {tags.map(tag => (
                <Chip size="small" label={tag} className={classes.chip} />
              ))}
            </Box>
          )}
          <Typography
            align="right"
            variant="h6"
            className={classes.author}
          >{`by ${author}`}</Typography>
        </Box>
      </Box>
    )

  return (
    <Card key={slug} className={classes.card}>
      <ButtonBase
        focusRipple
        className={classes.buttonBase}
        component={Link}
        to={slug}
      >
        <Box p={4} width="100%">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4">{title}</Typography>
            {type && (
              <Chip
                label={type}
                variant="outlined"
                className={classes.chip}
                color="primary"
              />
            )}
          </Box>
          <Typography variant="caption" color="textSecondary">
            {`${date} - ${timeToRead} min read`}
          </Typography>
          <Box py="1em" clone>
            <Typography variant="body1">{description}</Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {tags && (
              <Box width="60%" m={-0.5}>
                {tags.map(tag => (
                  <Chip
                    size="small"
                    label={tag}
                    className={classes.chip}
                    color="secondary"
                  />
                ))}
              </Box>
            )}
            <Typography
              align="right"
              variant="h6"
              className={classes.author}
            >{`by ${author}`}</Typography>
          </Box>
        </Box>
      </ButtonBase>
    </Card>
  )
}

export default BlogCard
