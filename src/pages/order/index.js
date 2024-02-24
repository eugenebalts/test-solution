import BaseComponent from '../../components/base-component.js';
import {
  isCorrectCountry,
  isCorrectNumberLength,
  isCorrectSymbol,
} from '../../utils/numberFormatting.js';

class OrderPage {
  #name = '';
  #phone = '';
  #hiddenField = 'test';
  #submitted = false;

  render() {
    const page = new BaseComponent('page', ['page', 'page_order']).getElement();
    const introduction = this.#createIntroduction();
    const form = this.#createForm();

    page.append(introduction, form);

    return page;
  }

  #createIntroduction() {
    const introduction = new BaseComponent('div', [
      'order__introduction',
    ]).getElement();

    const introductionTitle = new BaseComponent('h1', [
      'title',
      'order__introduction__title',
    ]).getElement();

    introductionTitle.innerHTML = `<span>Оставьте заявку</span> и вы получите максимально выгодное
    на сегодняшний день предложение. Не упустите этот уникальный шанс!`;

    introduction.appendChild(introductionTitle);

    return introduction;
  }

  #createForm() {
    const form = new BaseComponent('form', [
      'form',
      'order__form',
    ]).getElement();

    const formTextContent = new BaseComponent('div', [
      'form__text-content',
    ]).getElement();

    const formTitle = new BaseComponent(
      'h2',
      ['title', 'form__title'],
      'Оставьте заявку,'
    ).getElement();

    const formSubtitle = new BaseComponent(
      'p',
      ['form__subtitle'],
      'чтобы узнать подробности.'
    ).getElement();

    formTextContent.append(formTitle, formSubtitle);

    const formName = this.#createFormName();
    const formPhone = this.#createFormPhone();
    const formSubmit = this.#createFormSubmit();

    form.append(formTextContent, formName, formPhone, formSubmit);

    form.addEventListener('submit', () => {
      const isValidNumber = this.#phone.replace(/\D/g, '');
      console.log(isValidNumber);
    });

    return form;
  }

  #createFormName() {
    const input = new BaseComponent('input', ['form__input']).getElement();
    input.placeholder = 'Ваше имя';
    input.required = true;

    input.addEventListener('input', (event) => {
      this.#name = event.target.value;
    });

    const inputField = this.#createInputFiled('Имя', input);

    return inputField;
  }

  #createFormPhone() {
    const input = new BaseComponent('input', ['form__input']).getElement();
    input.type = 'text';
    input.placeholder = '+7(777)777-77-77';
    input.required = true;

    input.addEventListener('input', (event) => {
      const currentValue = event.target.value;
      const number = currentValue.slice(2).replace(/\D/g, '');

      if (!isCorrectSymbol(currentValue)) {
        console.log(currentValue);
        input.value = currentValue.slice(0, currentValue.length - 1);

        return;
      }

      if (!isCorrectCountry(currentValue)) {
        input.setCustomValidity('Мы обслуживаем только российские номера (+7)');
        input.reportValidity();

        return;
      }

      input.value = formatPhoneNumber(number);

      if (!isCorrectNumberLength(number)) {
        input.setCustomValidity('Неверная длина номера');
        input.reportValidity();

        return;
      }

      input.setCustomValidity('');
      input.reportValidity();

      console.log(number);

      this.#phone = event.target.value;
    });

    const inputField = this.#createInputFiled('Телефон', input);

    return inputField;
  }

  #createFormSubmit() {
    const input = new BaseComponent('input', ['form__submit']).getElement();
    input.type = 'submit';

    input.addEventListener('click', (event) => {
      event.preventDefault();
    });

    return input;
  }

  #createInputFiled(label, inputHTML) {
    const inputField = new BaseComponent('div', ['form__field']).getElement();
    const fieldLabel = new BaseComponent(
      'label',
      ['form__label'],
      label
    ).getElement();

    inputField.append(fieldLabel);

    fieldLabel.for = inputHTML.id;

    inputField.append(inputHTML);

    return inputField;
  }
}

function formatPhoneNumber(number) {
  let formattedValue = '+7';

  if (number.length >= 1) {
    formattedValue += `(${number.slice(0, 3)}`;
  }
  if (number.length >= 4) {
    formattedValue += `)${number.slice(3, 6)}`;
  }
  if (number.length >= 7) {
    formattedValue += `-${number.slice(6, 8)}`;
  }
  if (number.length >= 9) {
    formattedValue += `-${number.slice(8)}`;
  }

  return formattedValue;
}

export default new OrderPage().render();
