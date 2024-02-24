import BaseComponent from '../../components/base-component.js';
import {
  formatPhoneNumber,
  isCorrectCountry,
  isCorrectNumberLength,
  isCorrectSymbol,
} from '../../utils/numberFormatting.js';
import api from '../../services/api.js';

class OrderPage {
  #name = '';
  #phone = '';
  #hiddenField = 'test';
  #inputSubmit;

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

    introductionTitle.innerHTML = `<span>Оставьте заявку</span><br> и вы получите максимально выгодное
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

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      this.#handleFormSubmit();
    });

    return form;
  }

  #createFormName() {
    const inputName = new BaseComponent('input', ['form__input']).getElement();
    inputName.placeholder = 'Ваше имя';
    inputName.required = true;

    inputName.addEventListener('input', (event) => {
      this.#name = event.target.value;
    });

    const inputField = this.#createInputFiled('Имя', inputName);

    return inputField;
  }

  #createFormPhone() {
    const inputPhone = new BaseComponent('input', ['form__input']).getElement();
    inputPhone.type = 'text';
    inputPhone.placeholder = '+7(777)777-77-77';
    inputPhone.required = true;

    inputPhone.addEventListener('input', (event) => {
      this.#handleInputPhoneChange(inputPhone, event);
    });

    const inputField = this.#createInputFiled('Телефон', inputPhone);

    return inputField;
  }

  #createFormSubmit() {
    const input = new BaseComponent('input', ['form__submit']).getElement();
    input.type = 'submit';

    this.#inputSubmit = input;

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

  #handleInputPhoneChange(inputPhone, event) {
    const currentValue = event.target.value;
    const number = currentValue.slice(2).replace(/\D/g, '').slice(0, 10);

    if (!isCorrectSymbol(currentValue)) {
      inputPhone.value = currentValue.slice(0, currentValue.length - 1);

      return;
    }

    if (!isCorrectCountry(currentValue)) {
      inputPhone.setCustomValidity(
        'Мы обслуживаем только российские номера (+7)'
      );
      inputPhone.reportValidity();

      return;
    }

    inputPhone.value = formatPhoneNumber(number);

    if (!isCorrectNumberLength(number)) {
      inputPhone.setCustomValidity('Неверная длина номера');
      inputPhone.reportValidity();

      return;
    }

    inputPhone.setCustomValidity('');
    inputPhone.reportValidity();

    this.#phone = inputPhone.value;
  }

  async #handleFormSubmit() {
    const registeredUsers =
      JSON.parse(localStorage.getItem('registeredUsers')) || [];

    const userData = {
      name: this.#name,
      phone: this.#phone,
    };

    const isUserRegistered = registeredUsers.length
      ? registeredUsers.find(
          (user) => user.name === userData.name && user.phone === userData.phone
        )
      : false;

    this.#inputSubmit.disabled = true;

    if (isUserRegistered) {
      alert('Заявка на эти данные уже оформлена');

      this.#inputSubmit.disabled = false;

      return;
    }

    try {
      const response = await api.sendForm(
        this.#name,
        this.#phone,
        this.#hiddenField
      );

      if (response.ok) {
        registeredUsers.push(userData);

        localStorage.setItem(
          'registeredUsers',
          JSON.stringify(registeredUsers)
        );

        window.location.hash = 'success';
      } else {
        throw new Error('Ошибка при отправке формы');
      }
    } catch (err) {
      window.location.hash = 'error';
    }
  }
}

export default new OrderPage().render();
