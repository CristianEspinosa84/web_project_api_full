const express = require("express");
const {
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
} = require("../controllers/user");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.patch("/me", updateUserProfile); // 📌 Actualizar perfil
router.patch("/me/avatar", updateUserAvatar); // 📌 Actualizar avatar

module.exports = router;
