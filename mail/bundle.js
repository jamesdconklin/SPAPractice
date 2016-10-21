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

	// console.log("IT'S ALIVE");
	const Router = __webpack_require__(1);
	const Inbox = __webpack_require__(2);

	const routes = {};

	function handleSidebarEvent(ev) {
	  let target = ev.target;
	  while (target && target.tagName !== "LI") {
	    target = target.parentNode;
	  }
	  // console.log(ev.target);
	  // console.log(ev.currentTarget);
	  // console.log(ev.delegationTarget);

	  if (target) {
	    // debugger
	    let fragment = target.innerText.toLowerCase();
	    window.location.hash = fragment;
	  } else {
	    console.log("not working");
	  }
	}

	function addSidebarListener() {
	  var sidebar = document.querySelector(".sidebar-nav");
	  sidebar.addEventListener("click",
	    (ev) => handleSidebarEvent(ev)
	  );
	}

	window.addEventListener("DOMContentLoaded",
	  function(e) {
	    addSidebarListener();
	    const content = document.querySelector('.content');
	    const inbox = new Inbox(content);
	    routes.inbox = inbox;
	    const router = new Router(content, routes);
	    router.start();
	    window.location.hash = "inbox";
	  }
	);


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Router {
	  constructor(node, routes={}) {
	    this.node = node;
	    this.routes = routes;
	  }

	  start() {
	    this.render();
	    window.addEventListener("hashchange",
	      (ev) => {
	        this.render();
	      }
	    );
	  }

	  render() {
	    this.node.innerHTML = "";
	    let component = this.activeRoute();
	    if (component) {
	      this.node.appendChild(component.render());
	    } else {
	      this.node.innerHTML = "";
	      // let p = document.createElement("p");
	      // p.innerHTML = component;
	      // this.node.appendChild(p);
	    }
	  }

	  activeRoute() {
	    let hash = window.location.hash.slice(1);
	    return this.routes[hash]; //|| hash.slice(1);
	  }
	}


	module.exports = Router;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(3);

	class Inbox {
	  constructor(node) {
	    this.node = node;
	    this.messages = new MessageStore();
	  }

	  render() {
	    let ul = document.createElement("ul");
	    ul.className = "messages";

	    this.messages.getInboxMessages().forEach(
	      (message) => {
	        let li = this.renderMessage(message);
	        ul.appendChild(li);
	      }
	    );

	    return ul;
	  }

	  renderMessage(message) {
	    let li = document.createElement("li");
	    li.className = "message";

	    //Google JSX
	    let fromSpan = document.createElement("span");
	    fromSpan.className = "from";
	    fromSpan.innerText = message.from;

	    let subjectSpan = document.createElement("span");
	    subjectSpan.className = "subject";
	    subjectSpan.innerText = message.subject;

	    let bodySpan = document.createElement("span");
	    bodySpan.className = "body";
	    bodySpan.innerText = message.body;

	    [fromSpan, subjectSpan, bodySpan].forEach(
	      (span) => li.appendChild(span)
	    );

	    return li;

	  }
	}

	module.exports = Inbox;


/***/ },
/* 3 */
/***/ function(module, exports) {

	class MessageStore {
	  constructor() {
	    let messages = {
	      sent: [
	        {to: "friend@mail.com", subject: "Check this out", body: "It's so cool"},
	        {to: "person@mail.com", subject: "zzz", body: "so booring"}
	      ],
	      inbox: [
	        {from: "grandma@mail.com", subject: "Fwd: Fwd: Fwd: Check this out", body:
	      "Stay at home mom discovers cure for leg cramps. Doctors hate her"},
	      {from: "person@mail.com", subject: "Questionnaire", body: "Take this free quiz win $1000 dollars"}
	      ]
	    };
	    this.getInboxMessages = () => messages.inbox;
	    this.getSentMessages = () => messages.sent;
	  }
	}


	module.exports = MessageStore;


/***/ }
/******/ ]);