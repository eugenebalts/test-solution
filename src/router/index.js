import OrderPage from '../pages/order/index.js';
import successPage from '../pages/success/index.js';
import errorPage from '../pages/error/index.js';

export default function createRouter(appendIn) {
  if (appendIn instanceof HTMLElement) {
    window.addEventListener('load', () => {
      const { hash } = window.location;

      navigate(hash);
    });
    window.addEventListener('hashchange', () => {
      const { hash } = window.location;

      navigate(hash);
    });

    const navigate = (to) => {
      appendIn.innerHTML = '';

      switch (to) {
        case '#success':
          appendIn.append(successPage);
          break;
        case '#error':
          appendIn.append(errorPage);
          break;
        default:
          goTo('');
          appendIn.append(new OrderPage().getElement());
      }
      appendIn.append();
    };
  }
}

export function goTo(to) {
  window.location.hash = to;
}
