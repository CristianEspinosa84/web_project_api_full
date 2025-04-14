export default class Utils {
  constructor(settings) {
    this.formSection = settings.formSection;
    this.overlay = settings.overlay;
    this.inputName = settings.inputName;
    this.inputAbout = settings.inputAbout;
    this.profileNameElement = settings.profileNameElement;
    this.profileAboutElement = settings.profileAboutElement;
  }

  completeFormElement = (evt) => {
    evt.preventDefault();
    if (
      this.inputName.value.trim() === "" ||
      this.inputAbout.value.trim() === ""
    ) {
      return;
    }
    this.profileNameElement.textContent = this.inputName.value;
    this.profileAboutElement.textContent = this.inputAbout.value;

    this.closeForm();
  };

  setEventListeners() {
    this.formSection.addEventListener(
      "submit",
      this.completeFormElement.bind(this)
    );
  }
  setPopupCloseMethod(closeForm) {
    this.closeForm = closeForm;
  }

  setPopupCloseMethodCard(closeAddCard) {
    this.closeAddCard = closeAddCard;
  }
}
