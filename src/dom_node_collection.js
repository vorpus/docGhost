class DOMNodeCollection {
  constructor(HTMLElements) {
    this.elements = HTMLElements;
  }

  get(el) {
    return this.elements[el];
  }

  each(cb) {
    this.elements.forEach(cb);
  }

  html(string) {
    if (string === undefined) {
      return this.elements[0].innerHTML;
    } else {
      this.each( (element) => {
        element.innerHTML = string;
      });
    }
  }

  empty() {
    this.each( (element) => {
      $l(element).html("");
    });
  }

  append(elementToAppend) {
    if (elementToAppend instanceof DOMNodeCollection) {
      this.each((element) => {
        for (let j = 0; j < elementToAppend.elements.length; j++) {
          element.appendChild(elementToAppend.elements[j].cloneNode(true));
        }
      });
    } else if (elementToAppend instanceof HTMLElement) {
      this.append($l(elementToAppend));
    } else if (typeof elementToAppend === 'string') {
      this.each( (element) =>  element.innerHTML += elementToAppend );
    }
    return this.elements;
  }

  attr(key, val) {
    if (typeof val === 'string') {
      this.each( (element) => element.setAttribute(key, val) );
    } else {
      return this.elements[0].getAttribute(key);
    }
  }

  addClass(classToAdd) {
    this.each( (element) => element.classList.add(classToAdd));
  }

  removeClass(classToRemove) {
    this.each( (element) => element.classList.remove(classToRemove));
  }

  children() {
    let childNodes = [];
    this.each( (element) => {
      const childNodeList = element.children;
      childNodes = childNodes.concat(Array.from(childNodeList));
    });
    return new DOMNodeCollection(childNodes);
  }

  parent() {
    let parentNodes = [];
    this.each( (element) => {
      parentNodes = parentNodes.concat(element.parentNode);
    });
    return new DOMNodeCollection(parentNodes);
  }

  find(selector) {
    let found = [];
    this.each( (element) => {
      found = found.concat(Array.from(element.querySelectorAll(selector)));
    });
    return new DOMNodeCollection(found);
  }

  remove() {
    this.each( (element) => {
      element.parentNode.removeChild(element)
    });
  }

  on(handler, cb) {
    this.each( (element) => {
      element.addEventListener(handler, cb);
      const eventKey = `docGhostEvents-${handler}`;
      if (typeof element[eventKey] === "undefined") {
        element[eventKey] = [];
      }
      element[eventKey].push(cb);
    });
  }

  off(handler) {
    this.each( (element) => {
      const eventKey = `docGhostEvents-${handler}`;
      if (element[eventKey]) {
        element[eventKey].forEach(cb => {
          element.removeEventListener(handler, cb);
        });
      }
      element[eventKey] = [];
    });
  }

}

module.exports = DOMNodeCollection;
