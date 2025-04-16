const express = require("express");
const { celebrate, Joi } = require("celebrate");
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/card");

const router = express.Router();

// 🟢 Obtener todas las tarjetas
router.get("/", getCards);

// ✅ Validación para crear tarjeta
router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().uri(),
    }),
  }),
  createCard
);

// 🟢 Eliminar tarjeta
router.delete("/:cardId", deleteCard);

// 🟢 Dar y quitar like
router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", dislikeCard);

module.exports = router;
