import React from "react";
import closeIcon from "../Images/CloseIcon.jpg";

function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div
      className={`form popup ${isOpen ? "form_opened" : "popup-closed"}`}
      id="popup__image"
    >
      <button type="button" className="popup__close" onClick={onClose}>
        <img src={closeIcon} alt="Cerrar imagen" />
      </button>

      <img
        className="popup__picture"
        src={card?.link || "#"}
        alt={card?.name || "Imagen ampliada"}
      />
      <h3 className="popup__title">{card?.name || ""}</h3>
    </div>
  );
}

export default ImagePopup;
