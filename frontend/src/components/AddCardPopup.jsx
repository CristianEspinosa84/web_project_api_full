import React, { useState, useEffect } from "react";
import closeIcon from "../Images/CloseIcon.jpg";

function AddCardPopup({ isOpen, onClose, onAddPlace }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setLink("");
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name: title, link });
  }

  return (
    <div
      className={`form ${isOpen ? "form_opened" : "closed-window"}`}
      id="addcard-popud"
    >
      <form
        className="form__popup"
        id="addcard-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="form__title">Nuevo Lugar</h2>

        <button type="button" className="form__close" onClick={onClose}>
          <img src={closeIcon} alt="Cerrar" />
        </button>

        <input
          type="text"
          name="title"
          className="form__name form__input"
          placeholder="Titulo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          minLength="2"
          maxLength="10"
        />
        <span className="form__error addcard-title-error"></span>

        <input
          type="url"
          name="link"
          className="form__about form__input"
          placeholder="Enlace a la imagen"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
        <span className="form__error addcard-url-error"></span>

        <button className="form__button" type="submit">
          Crear
        </button>
      </form>
    </div>
  );
}

export default AddCardPopup;
