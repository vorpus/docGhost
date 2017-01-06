# docGhost

## Overview

docGhost is a lightweight JavaScript library that allows users to manipulate DOM elements. This results in code that is both faster to write and easier to understand. Check out a demo of docGhost in action [here](https://vorpus.github.io/docGhost/snake-demo/).

## Getting Started
### Installation

It's easy to get started with docGhost! Just download the source here and add the following line to the `head` of your HTML document!

```html
<head>
  <script src="..path/to/docGhost.js" charset="utf-8"></script>
</head>
```

Test it out by trying a quick console command!
```javascript
$l( () => alert('armed and ready!') )
```

#### Compiling from Source

To compile the source on your own machine, a Webpack configuration file is provided with entry and output files. Run the following commands in your console.

```
npm install webpack -g
webpack
```


### Example Usage

With docGhost installed, it's easy start manipulating your HTML elements!

You can find use it to find HTML elements by tag or CSS selector...
```javascript
$l('li') //li element selector

$l('#this-form') //id selector

$l('.header') //class selector
            .html('hello') //changes the inner HTML to 'hello'
```

You can chain selectors to get really specific...
```javascript
$l('.findme').parent().children().html('hi')
```

You can perform AJAX requests...
```javascript
$l.ajax({
  dataType: 'json',
  method: 'GET',
  url: 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=APP_ID_HERE'
  //insert your application ID to the above request
})
```

### Under the hood
docGhost accomplishes this by using wrapping vanilla JavaScript functions in a more intuitive syntax. For example, `attr` combines functionality of both `setAttribute` and `getAttribute`.
```javascript
attr(key, val) {
  if (typeof val === 'string') {
    this.each( (element) => element.setAttribute(key, val) );
  } else {
    return this.elements[0].getAttribute(key);
  }
}
```


## API
**`$l ([string, HTML element, function])` -**
The wrapper `$l` is used to create `DOMNodeCollection`s from HTML elements. `$l` can also be used as a CSS selector by element class or ID. If given a function, function will be called after the document has loaded in the order that the function was given.

The following functions are available to `DOMNodeCollection`s

**`.html([string])` -** If given a `string`, will set the HTML content of each node to be equal to `string`. Otherwise, will return the HTML of the first element of the node collection.

**`.get(index)` -** Returns the HTMLElement at `index` within the collection.

**`.empty()` -** Clears the content of each node.

**`.append(elementToAppend)` -** Given a string or HTML `elementToAppend`, will append the element to the end of each node

**`.attr(key, val)` -** sets the HTML attribute `key` for each node to be equivalent to `val`.

**`.addClass(classToAdd)` -** Adds a class `classToAdd` to each node.

**`.removeClass(classToRemove)` -** Removes a class `classToRemove` from each node.

**`.children()` -** Returns a `DOMNodeCollection` containing the children of each node.

**`.parent()` -** Returns a `DOMNodeCollection` containing the parent element of each node.

**`.find(selector)` -** Returns a `DOMNodeCollection` containing descendants of each node that match the `selector` criteria.

**`.remove()` -** Removes all instances of each node from the document.

**`.on(handler, callback)` -** Adds an event listener to each node for the `handler` event. Calls `callback` when triggered.

**`.off(handler)` -** Removes all event listeners on each node listening for the `handler` event.

**`.ajax(options)` -** Creates and sends an `XMLHTTPRequest` using given `options` object.

## Demo

[Live demo](https://vorpus.github.io/docGhost-snakeDemo/)
| [Source](https://github.com/vorpus/docGhost-snakeDemo/)

To demonstrate the flexibility of the docGhost framework, I have written a simple Snake game which uses JavaScript for the game logic and docGhost to manipulate DOM elements and add event listeners for user input.

![demo](/lib/demo.gif)

* In `main.js`, docGhost is used as a listener for the document's ready state. After it receives an affirmative, SnakeJS begins the game logic.

* `append` is used to create each game cell.

* `on` listens for keyboard inputs (WASD or arrow keys!) and calls snake methods to move the snake accordingly.

* On each step (120ms), SnakeJS uses docGhost's `children` function to traverse the grid.

* `addClass` and `removeClass` function change board colors depending on the snake's and the apple's position.
