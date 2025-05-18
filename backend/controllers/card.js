const Card = require("../models/card");

// 📌 Obtener todas las tarjetas
const getCards = (req, res) => {
  Card.find({})
    .populate("owner")
    .then((cards) => res.status(200).json(cards))
    .catch(() =>
      res.status(500).json({ message: "Error interno del servidor" })
    );
};

// 📌 Crear una nueva tarjeta
const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id; // Middleware asigna el usuario automáticamente

  Card.create({ name, link, owner })
    .then((card) => card.populate("owner")) // 🔥 esta línea es clave
    .then((populatedCard) => res.status(201).json(populatedCard))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .json({ message: "Datos inválidos para crear tarjeta" });
      }
      res.status(500).json({ message: "Error interno del servidor" });
    });
};

// 📌 Eliminar una tarjeta por ID con orFail()
const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      // Validar si el usuario actual es el dueño
      if (card.owner.toString() !== req.user._id) {
        return res
          .status(403)
          .json({ message: "No tienes permiso para eliminar esta tarjeta" });
      }

      // Eliminar la tarjeta si es dueño
      return Card.findByIdAndDelete(cardId).then(() =>
        res.status(200).json({ message: "Tarjeta eliminada con éxito" })
      );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).json({ message: "ID de tarjeta inválido" });
      }
      res
        .status(err.statusCode || 500)
        .json({ message: err.message || "Error interno del servidor" });
    });
};

// 📌 Dar like a una tarjeta
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // Agrega el ID del usuario si no está
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.status(200).json(card))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).json({ message: "ID de tarjeta inválido" });
      }
      res
        .status(err.statusCode || 500)
        .json({ message: err.message || "Error interno del servidor" });
    });
};

// 📌 Quitar like de una tarjeta
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // Elimina el ID del usuario del array de likes
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.status(200).json(card))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).json({ message: "ID de tarjeta inválido" });
      }
      res
        .status(err.statusCode || 500)
        .json({ message: err.message || "Error interno del servidor" });
    });
};

// 📌 Exportar todas las funciones
module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };
