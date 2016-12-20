## docGhost

### Overview

docGhost is a lightweight JavaScript framework that allows users to manipulate DOM elements in a more succinct and intuitive way. This results in code that is both faster to write and easier to understand.


### API
**$l** ([string, HTML element, function]) -
The wrapper `$l` is used to create `DOMNodeCollection`s from HTML elements. `$l` can also be used as a CSS selector by element class or ID. If given a function, function will be called after the document has loaded in the order that the function was given.

The following functions are available to `DOMNodeCollection`s

**.html([string]) -** If given a `string`, will set the HTML content of each node to be equal to `string`. Otherwise, will return the HTML of the first element of the node collection.

**.empty() -** Clears the content of each node.

**.append(elementToAppend) -** Given a string or HTML `elementToAppend`, will append the element to the end of each node

**.attr(key, val) -** sets the HTML attribute `key` for each node to be equivalent to `val`.

**.addClass(classToAdd) -** Adds a class `classToAdd` to each node.

**.removeClass(classToRemove) -** Removes a class `classToRemove` from each node.

**.children() -** Returns a `DOMNodeCollection` containing the children of each node.

**.parent() -** Returns a `DOMNodeCollection` containing the parent element of each node.

**.find(selector) -** Returns a `DOMNodeCollection` containing descendants of each node that match the `selector` criteria.

**.remove() -** Removes all instances of each node from the document.

**.on(handler, callback) -** Adds an event listener to each node for the `handler` event. Calls `callback` when triggered.

**.off(handler) -** Removes all event listeners on each node listening for the `handler` event.

**.ajax(options) -** Creates and sends an `XMLHTTPRequest` using given `options` object.
