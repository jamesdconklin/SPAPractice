// console.log("IT'S ALIVE");
const Router = require('./router.js');
const Inbox = require('./inbox.js');

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
