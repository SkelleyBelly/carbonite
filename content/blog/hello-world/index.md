---
title: Hello World
date: "2015-05-01T22:12:03.284Z"
description: "Hello World"
author: Nathan Skelley
type: Demo
tags: ['Example', 'Demo']
---

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
