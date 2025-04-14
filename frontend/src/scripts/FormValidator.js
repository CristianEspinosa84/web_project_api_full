export default class FormValidator {
  constructor(settings) {
    this.settings = settings;
  }

  showInputError(formPopup, inputElement, errorMessage) {
    const errorElement = formPopup.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.settings.errorClass);
  }

  hideInputError(formPopup, inputElement) {
    const errorElement = formPopup.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.settings.inputErrorClass);
    errorElement.classList.remove(this.settings.errorClass);
    errorElement.textContent = "";
  }

  checkInputValidity(formPopup, inputElement) {
    if (!inputElement.validity.valid) {
      this.showInputError(
        formPopup,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this.hideInputError(formPopup, inputElement);
    }
    this.buttonDisable(formPopup);
  }

  buttonDisable(formPopup) {
    const submitButton = formPopup.querySelector(
      this.settings.submitButtonSelector
    );
    if (!submitButton) return; // Si no hay botón, salir de la función
    const inputList = formPopup.querySelectorAll(this.settings.inputSelector);
    const allValid = Array.from(inputList).every(
      (input) => input.validity.valid
    );

    if (allValid) {
      submitButton.classList.remove(this.settings.inactiveButtonClass);
      submitButton.removeAttribute("disabled");
    } else {
      submitButton.classList.add(this.settings.inactiveButtonClass);
      submitButton.setAttribute("disabled", true);
    }
  }

  setEventListeners(formPopup) {
    const inputList = Array.from(
      formPopup.querySelectorAll(this.settings.inputSelector)
    );
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.checkInputValidity(formPopup, inputElement);
      });
    });
    this.buttonDisable(formPopup);
  }

  enableValidation() {
    const formList = Array.from(
      document.querySelectorAll(this.settings.formSelector)
    );
    formList.forEach((formPopup) => {
      formPopup.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });

      this.setEventListeners(formPopup);
    });
  }
}
