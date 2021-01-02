---
title: "Carbonite: Contributor Guide"
date: "2021-01-02"
description: "The contributor guide for Carbonite"
author: Nathan Skelley
type: Guide
---

Reckon that Carbonite could do with some more infomation in it? I agree. The aim here is for us to create a detailed and deep collection of knowledge
that any and all Turing ANDis can contribute to and learn from. Some may be mainly contributors, some may mainly just learn from it and contribute hardly
anything at all, both are fine, as well as everything in between. We're all here to learn and help each other.

Carbonite is currently just a simple Gatsby app that turns markdown blog entries into pages at build time - to make a new page, just add a new blog entry.
This guide should tell you everything you need to know to contribute, but if things still don't make sense, just talk to **Nathan Skelley**, the current
maintainer (he's not very scary).

Before you set off, be aware that this guide describes only how to create blog pages by adding content, it does not cover changes to the actual source code
of Carbonite. For this, talk to Skelley.

#### Folder Structure

All blog entries live within the `content/blog` folder. to add a new blog post, just create a new sub-folder with an `index.md` file in it, and there you go,
instant blog! From there, you can write in markdown and Gatsby will convert it into page for you. From within your markdown, you can use all the expected
syntax (the section below will cover your options in more detail), and refer to other assets in your blog folder as well.

This means that a standard blog post with a few images might have a folder structure like this:

```md
src/content
    - blog
        - my_new_blog_entry
            - index.md
            - image_1.jpg
            _ image_2.jpg
        ...otherBlogEntries
```


This is my first post on my new fake blog! How exciting!

I'm sure I'll write a lot more interesting things in the future.

Oh, and here's a great quote from this Wikipedia on
[salted duck eggs](https://en.wikipedia.org/wiki/Salted_duck_egg).

> A salted duck egg is a Chinese preserved food product made by soaking duck
> eggs in brine, or packing each egg in damp, salted charcoal. In Asian
> supermarkets, these eggs are sometimes sold covered in a thick layer of salted
> charcoal paste. The eggs may also be sold with the salted paste removed,
> wrapped in plastic, and vacuum packed. From the salt curing process, the
> salted duck eggs have a briny aroma, a gelatin-like egg white and a
> firm-textured, round yolk that is bright orange-red in color.

![Chinese Salty Egg](./salty_egg.jpg)

You can also write code blocks here!

```js
const saltyDuckEgg = "chinese preserved food product"
```

| Number | Title                                    | Year |
| :----- | :--------------------------------------- | ---: |
| 1      | Harry Potter and the Philosopher’s Stone | 2001 |
| 2      | Harry Potter and the Chamber of Secrets  | 2002 |
| 3      | Harry Potter and the Prisoner of Azkaban | 2004 |

### Headers

```markdown
# Header 1
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


### Quotes

```markdown
> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
```

> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

### Lists

```markdown
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

```markdown
1. Buy flour and salt
2. Mix together with water
3. Bake
```

1. Buy flour and salt
2. Mix together with water
3. Bake

### Links

```markdown
This is [an example](http://example.com "Example") link.

[This link](http://example.com) has no title attr.

This is [an example] [id] reference-style link.

[id]: http://example.com "Optional Title"
```

This is [an example](http://example.com "Example") link.

[This link](http://example.com) has no title attr.

This is [an example][id] reference-style link.

[id]: http://example.com "Optional Title"

### Text Decoration

```markdown
*single asterisks*

_single underscores_

**double asterisks**

__double underscores__
```

_single asterisks_

_single underscores_

**double asterisks**

**double underscores**


### Code

###### JavaScript

    ```js
    const hello = () => {console.log("HELLO!")}

    hello()
    ```

```js
const hello = () => {console.log("HELLO!")}

hello()
```

###### JSX (React)

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

###### TypeScript
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
