import BackToHomePageButton from '../../components/backToMainBtn.js';
import BaseComponent from '../../components/base-component.js';

class ErrorPage extends BaseComponent {
  constructor() {
    super('div', ['page']);
    this.#render();
  }

  #render() {
    const pageTitle = new BaseComponent('h1', ['title']).getElement();
    pageTitle.innerHTML = `<span>Ошибка</span>. Пожалуйста, попробуйте позже!`;

    const pageButton = new BackToHomePageButton().getElement();

    this._node.append(pageTitle, pageButton);
  }
}

export default new ErrorPage().getElement();
