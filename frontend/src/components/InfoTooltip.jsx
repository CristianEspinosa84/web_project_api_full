import React from "react";
import closeIcon from "../Images/CloseIcon.jpg";
import successIcon from "../Images/success-icon.png";
import errorIcon from "../Images/error-icon.png";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`form ${isOpen ? "form_opened" : "closed-window"}`}>
      <div className="form__popup">
        <button type="button" className="form__close" onClick={onClose}>
          <img src={closeIcon} alt="Cerrar" />
        </button>

        <img
          src={isSuccess ? successIcon : errorIcon}
          alt={isSuccess ? "Éxito" : "Error"}
          className="form__icon"
        />
        <h2 className="form__title">
          {isSuccess
            ? "¡Registro exitoso!"
            : "Algo salió mal. Intenta nuevamente."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
