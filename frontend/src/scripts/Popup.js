export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._overlay = document.querySelector(".overlay"); // Asume que hay un overlay global
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup__opened");
    this._popup.classList.remove("closed-window", "popup-closed");
    this._overlay.classList.add("overlay__visible"); // Muestra el overlay
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup__opened");
    this._popup.classList.add("closed-window", "popup-closed");
    this._overlay.classList.remove("overlay__visible"); // Oculta el overlay
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton =
      this._popup.querySelector(".popup__close") ||
      this._popup.querySelector(".form__close") ||
      this._popup.querySelector(".confirmation__close");

    if (closeButton) {
      closeButton.addEventListener("click", () => this.close());

      // Cierra el popup al hacer clic fuera del formulario (en el área sombreada del popup o en el overlay)
      this._popup.addEventListener("click", (event) => {
        if (event.target === this._popup || event.target === this._overlay) {
          this.close();
        }
      });
    }
  }
}
