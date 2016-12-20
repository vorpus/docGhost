const DOMNodeCollection = require('./dom_node_collection.js');

let ready = false;
const functions = [];

function $l (selector) {
  if (selector instanceof Function) {
    if (ready) {
      selector();
    } else {
      functions.push(selector);
    }
  } else if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  } else if (typeof selector === "string") {
    const nodeList = Array.prototype.slice.call(document.querySelectorAll(selector));
    return new DOMNodeCollection(nodeList);
  }
}

const executeFunctions = function() {
  ready = true;
  for (let i = 0; i < functions.length; i++) {
    functions[i]();
  }
};

window.$l = $l;
document.addEventListener("DOMContentLoaded", executeFunctions);

$l.extend = function () {
  let args = Array.from(arguments);
  let newObj = {};
  for (let i = 0; i < args.length; i++) {
    for (let attrname in args[i]) { newObj[attrname] = args[i][attrname]; }
  }
  return newObj;
};

$l.ajax = function (options) {
  let defaultOptions = {
    dataType: 'json',
    method: 'GET',
    success: () => {},
    error: () => {},
    url: 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b'
  };

  const newObj = this.extend(defaultOptions, options);
  //step 1 - create xhr object
  const xhr = new XMLHttpRequest();

// step 2 - specify path and verb
  xhr.open(newObj.method, newObj.url);

// step 3 - register a callback
  xhr.onload = function () {
    if (xhr.status === 200) {
      newObj.success(xhr.response);
    } else {
      newObj.error(xhr.response);
    }
  };

  // step 4 - send off the request with optional data
  xhr.send(newObj);
};
