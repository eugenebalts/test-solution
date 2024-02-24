export default class BaseComponent {
  #node;

  constructor(tagName, classNames, textContent) {
    this.#node = document.createElement(tagName);
    if (Array.isArray(classNames)) this.#node.classList.add(...classNames);
    this.#node.textContent = textContent;
  }

  getElement() {
    return this.#node;
  }
}
