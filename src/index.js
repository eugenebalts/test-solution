import BaseComponent from './components/base-component.js';
import orderLayout from './pages/order/index.js';

class App {
  start() {
    this.render();
  }

  render() {
    const container = new BaseComponent('div', ['container']).getElement();
    container.append(orderLayout);

    document.body.append(container);
  }
}

new App().start();
