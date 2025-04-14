const express = require("express");
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/card");

const router = express.Router();

router.get("/", getCards);
router.post("/", createCard);
router.delete("/:cardId", deleteCard);
router.put("/:cardId/likes", likeCard); // 📌 Dar like
router.delete("/:cardId/likes", dislikeCard); // 📌 Quitar like

module.exports = router;
