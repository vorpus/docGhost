const DOMNodeCollection = require('./dom_node_collection.js');

function $l (selector) {
  if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  }
  if (typeof selector === "string") {
    const nodeList = Array.prototype.slice.call(document.querySelectorAll(selector));
    return new DOMNodeCollection(nodeList);
  }
}

window.$l = $l;
