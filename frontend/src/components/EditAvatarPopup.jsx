import React, { useState, useEffect } from "react";
import closeIcon from "../Images/CloseIcon.jpg";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (isOpen) setAvatar("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar });
  }

  return (
    <div
      className={`form ${isOpen ? "form_opened" : "closed-window"}`}
      id="popup__edit-photo"
    >
      <form
        className="edit__popup form__popup"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="form__title">Cambiar foto de perfil</h2>

        <button type="button" className="form__close" onClick={onClose}>
          <img src={closeIcon} alt="Cerrar ventana" />
        </button>

        <input
          type="url"
          name="avatar"
          className="form__input form__photo"
          placeholder="URL de la imagen"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
        <span className="form__error profile-photo-url-error"></span>

        <button className="form__button" type="submit">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default EditAvatarPopup;
