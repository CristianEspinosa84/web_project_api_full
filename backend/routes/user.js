const express = require("express");
const { celebrate, Joi } = require("celebrate");
const {
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
} = require("../controllers/user");

const router = express.Router();

// 🟢 Obtener todos los usuarios
router.get("/", getUsers);


// 🟢Obtener usuario por ID
router.get("/:id", getUserById);

// ✅ Validación para actualizar perfil
router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      about: Joi.string().required(),
    }),
  }),
  updateUserProfile
);

// ✅ Validación para actualizar avatar
router.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().uri().required(),
    }),
  }),
  updateUserAvatar
);

module.exports = router;
