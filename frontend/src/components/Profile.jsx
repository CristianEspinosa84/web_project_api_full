import React from "react";
import avatarImg from "../Images/JacquesCousteau.jpg";
import editIcon from "../Images/EditButton.jpg";

function Profile({
  name = "Jacques Cousteau",
  about = "Explorer",
  onEditProfile,
  onAddPlace,
  onEditAvatar,
}) {
  return (
    <section className="profile">
      <div className="profile__avatar-container" onClick={onEditAvatar}>
        <img
          src={avatarImg}
          alt="Avatar del perfil"
          className="profile__image"
        />
        <div className="profile__edit-icon"></div>
      </div>

      <div className="profile__content">
        <div className="profile__user">
          <h2 className="profile__name">{name}</h2>
          <button
            type="button"
            className="profile__edit"
            onClick={onEditProfile}
          >
            <img src={editIcon} alt="Editar perfil" />
          </button>
        </div>
        <p className="profile__about">{about}</p>
      </div>

      <button type="button" className="profile__button" onClick={onAddPlace}>
        +
      </button>
    </section>
  );
}

export default Profile;
