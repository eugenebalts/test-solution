export default class BaseComponent {
  _node;

  constructor(tagName, classNames, textContent) {
    this._node = document.createElement(tagName);
    if (Array.isArray(classNames)) this._node.classList.add(...classNames);
    this._node.textContent = textContent;
  }

  getElement() {
    return this._node;
  }
}
