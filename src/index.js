import BaseComponent from './components/base-component.js';
import createRouter from './router/index.js';

class App {
  start() {
    this.#render();
  }

  #render() {
    const container = new BaseComponent('div', ['container']).getElement();
    createRouter(container);

    document.body.append(container);
  }
}

new App().start();
