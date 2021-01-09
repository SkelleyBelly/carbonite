---
title: "Carbonite: Roadmap"
date: "2021-01-02"
description: "Some ideas for how Carbonite could be improved to make it more useful for ANDis"
author: [Nathan Skelley]
type: Guide
---

Some ideas on how to improve the Carbonite application to make it easier for ANDis to contribute to and learn from, roughly divided into difficulty. These are just some initial ideas, nothing concrete.

### Simple

- Convert source to TypeScript
- Add an ESLint configuration
- Update package.json (currently it uses the Gatsby default)
- Update manifest and favicon

### Intermediate
- Add mobile friendly designs
- Add Storybook to track components
- Add Jest tests
- Create enums for blog types and tags
- Add blog post table of contents
- Add Husky hooks to run tests on commit
- Add MDX support (to do more interesting things with our blog posts)

### Advanced
- Host behind Okta
- Add user profiles and show skills 