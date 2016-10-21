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
