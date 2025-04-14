import React from "react";
import closeIcon from "../Images/CloseIcon.jpg";

function ConfirmationPopup({ isOpen, onClose, onConfirm }) {
  function handleSubmit(e) {
    e.preventDefault();
    onConfirm();
  }

  return (
    <div
      className={`form ${isOpen ? "form_opened" : "closed-window"}`}
      id="popup__confirmation"
    >
      <form
        className="confirmation__popup form__popup"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="form__title">¿Estás seguro/a?</h2>

        <button type="button" className="confirmation__close" onClick={onClose}>
          <img src={closeIcon} alt="Cerrar confirmación" />
        </button>

        <button className="confirmation__button" type="submit">
          Sí
        </button>
      </form>
    </div>
  );
}

export default ConfirmationPopup;
