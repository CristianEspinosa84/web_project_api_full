import React from "react";

function Card({
  card,
  onCardClick,
  onLikeClick,
  onDeleteClick,
  currentUserId,
}) {
  const isOwn = card.owner._id === currentUserId;
  const isLiked = card.likes.some((like) => like._id === currentUserId);

  function handleLike() {
    onLikeClick(card);
  }

  function handleDelete() {
    onDeleteClick(card);
  }

  function handleClick() {
    onCardClick(card);
  }

  return (
    <div className="element">
      {isOwn && (
        <button className="element__trash" onClick={handleDelete}></button>
      )}
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button
            className={`element__like ${isLiked ? "element__like-black" : ""}`}
            onClick={handleLike}
          ></button>
          <span className="element__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
