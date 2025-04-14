import React, { useState, useEffect } from "react";
import closeIcon from "../Images/CloseIcon.jpg";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, currentUser }) {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setAbout(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, about });
  }

  return (
    <div
      className={`form ${isOpen ? "form_opened" : "closed-window"}`}
      id="profile__popup"
    >
      <form className="form__popup" onSubmit={handleSubmit} noValidate>
        <h2 className="form__title">Edit profile</h2>

        <button type="button" className="form__close" onClick={onClose}>
          <img src={closeIcon} alt="Cerrar" />
        </button>

        <input
          type="text"
          name="name"
          className="form__input form__name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength="2"
          maxLength="40"
        />
        <span className="form__error name-error"></span>

        <input
          type="text"
          name="about"
          className="form__input form__about"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          required
          minLength="2"
          maxLength="40"
        />
        <span className="form__error about-error"></span>

        <button className="form__button" type="submit">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default EditProfilePopup;
