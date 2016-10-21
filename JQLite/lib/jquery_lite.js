/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(htmlElements) {
	    this.htmlElements = htmlElements;
	  }

	  html(arg) {
	    if (typeof(arg) === "string") {
	      this.htmlElements.forEach(el => {
	        el.innerHTML = arg;
	      });
	      return this;
	    } else if (arg === undefined){
	      if (this.htmlElements.length === 0) {
	        return "";
	      } else {
	        return this.htmlElements[0].innerHTML;
	      }
	    }
	  }

	  empty() {
	    this.html("");
	  }

	  append(arg) {
	    if (arg instanceof DOMNodeCollection) {
	      this.htmlElements.forEach (
	        (thisEl) => {
	          arg.htmlElements.forEach(
	            (argEl) => {
	              thisEl.appendChild(argEl.cloneNode(true));
	            }
	          );
	        }
	      );
	    } else if (arg instanceof HTMLElement) {
	      this.htmlElements.forEach(
	        (el) => {
	          el.appendChild(arg.cloneNode(true));
	          console.log(el);
	          // debugger;
	      });
	    } else if (typeof(arg) === 'string') {
	      this.htmlElements.forEach(
	        (el) => {el.innerHTML += arg;}
	      );
	    } else {
	      //ERR
	    }
	  }

	  attr(key, value) {
	    if (key === undefined) {
	      return this.htmlElements[0].attributes;
	    }
	    if (value === undefined) {
	      return this.htmlElements[0].attributes[key].value;
	    }

	    this.htmlElements.forEach (el => {
	      if (value === null) {
	        el.removeAttribute(key);
	      } else {
	        el.setAttribute(key, value);
	      }
	    });
	  }
	  removeClass (remove) {
	    this.htmlElements.forEach(el => {
	      let classes = el.className;
	      let newClasses = classes.split(' ').filter(
	        cl => (cl !== remove)
	      ).join(' ');
	      if (newClasses === "") {
	        el.removeAttribute("class");
	      } else {
	        el.className = newClasses;
	      }
	    });
	  }

	  children() {
	    let childElements = this.htmlElements.reduce(
	      (accum, el) => accum.concat(Array.from(el.children)), []);
	    return new DOMNodeCollection(childElements);
	  }

	  parent() {
	    let parents = this.htmlElements.map(el => el.parentElement);
	    return new DOMNodeCollection(parents);
	  }

	  find(query) {
	    let found = [];

	    this.htmlElements.forEach( el => {
	      let nodeList = el.querySelectorAll(query);

	      found = found.concat(Array.from(nodeList));
	    });
	    return new DOMNodeCollection(found);
	  }

	  remove() {
	    var removed = [];
	    this.htmlElements.forEach(
	      el => {
	        el.remove();
	        removed.push(el);
	      }
	    );
	    this.htmlElements = [];
	    return removed;
	  }
	}



	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);