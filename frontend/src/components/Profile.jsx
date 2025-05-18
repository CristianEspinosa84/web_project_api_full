import React from "react";
import defaultAvatar from "../Images/JacquesCousteau.jpg";
import editIcon from "../Images/EditButton.jpg";

function Profile({
  name = "Jacques Cousteau",
  about = "Explorer",
  avatar,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
}) {

  const avatarToShow = avatar?.trim() ? avatar : defaultAvatar;

  return (
    <section className="profile">
      <div className="profile__avatar-container" onClick={onEditAvatar}>
        <img
          src={avatarToShow}
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
