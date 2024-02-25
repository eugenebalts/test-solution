import BackToHomePageButton from '../../components/backToMainBtn.js';
import BaseComponent from '../../components/base-component.js';

class SuccessPage extends BaseComponent {
  constructor() {
    super('div', ['page']);
    this.#render();
  }

  #render() {
    const pageTitle = new BaseComponent('h1', ['title']).getElement();
    pageTitle.innerHTML = `<span>Спасибо</span> за заказ!`;

    const pageButton = new BackToHomePageButton().getElement();

    this._node.append(pageTitle, pageButton);
  }
}

export default new SuccessPage().getElement();
