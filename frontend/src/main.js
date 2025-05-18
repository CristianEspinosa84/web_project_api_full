import React, { useEffect, useState } from "react";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import Card from "./components/Card";
import EditProfilePopup from "./components/EditProfilePopup";
import EditAvatarPopup from "./components/EditAvatarPopup";
import AddCardPopup from "./components/AddCardPopup";
import ImagePopup from "./components/ImagePopup";
import api from "./utils/api";

function Main() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false);
  const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log("Error al obtener usuario:", err));

    api
      .getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => console.log("Error al obtener tarjetas:", err));
  }, []);

  function handleEditProfileClick() {
    setIsEditProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlaceOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfileOpen(false);
    setIsAddPlaceOpen(false);
    setIsEditAvatarOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(data) {
    api.updateUserProfile(data.name, data.about).then((updatedUser) => {
      setCurrentUser(updatedUser);
      closeAllPopups();
    });
  }

  function handleUpdateAvatar(data) {
    api.updateUserAvatar(data.avatar).then((updatedUser) => {
      setCurrentUser(updatedUser);
      closeAllPopups();
    });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addNewCard(name, link).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    });
  }

  function handleLikeClick(card) {
    const isLiked = card.likes.some((like) =>
  typeof like === "string" ? like === currentUser._id : like._id === currentUser._id);

    const likeAction = isLiked
      ? api.dislikeCard(card._id)
      : api.likeCard(card._id);

    likeAction
      .then((updatedCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? updatedCard : c))
        );
      })
      .catch((err) => console.log("Error al actualizar like:", err));
  }

  function handleDeleteClick(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log("Error al eliminar tarjeta:", err));
  }

  return (
    <main className="main">
      <Profile
        name={currentUser.name}
        about={currentUser.about}
        avatar={currentUser.avatar} 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
      />

      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            currentUserId={currentUser._id}
            onCardClick={handleCardClick}
            onLikeClick={handleLikeClick}
            onDeleteClick={handleDeleteClick}
          />
        ))}
      </section>

      <Footer />

      <EditProfilePopup
        isOpen={isEditProfileOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        currentUser={currentUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddCardPopup
        isOpen={isAddPlaceOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
    </main>
  );
}

export default Main;
