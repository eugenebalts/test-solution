import { goTo } from '../router/index.js';
import BaseComponent from './base-component.js';

export default class BackToHomePageButton extends BaseComponent {
  constructor() {
    super('button', ['button'], 'Вернуться на главную страницу');
    this.#setListeners();
  }

  #setListeners() {
    this._node.addEventListener('click', () => {
      goTo('');
    });
  }
}
