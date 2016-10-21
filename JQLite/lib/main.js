const DOMNodeCollection = require("./dom_node_collection");

function $l(selector) {
  if (typeof(selector) === "string") {
    var selectedElements = document.querySelectorAll(selector);

    selectedElements = Array.from(selectedElements);
    return new DOMNodeCollection(selectedElements);
  } else if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);

  }


}


window.$l = $l;
