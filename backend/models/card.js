const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre de la tarjeta es obligatorio"],
    minlength: [2, "Debe tener al menos 2 caracteres"],
    maxlength: [30, "No puede tener más de 30 caracteres"],
  },
  link: {
    type: String,
    required: [true, "El enlace de la imagen es obligatorio"],
    validate: {
      validator: function (url) {
        return /^(https?:\/\/)(www\.)?[\w-]+(\.[\w-]+)+([/?#].*)?$/.test(url);
      },
      message: "El enlace de la imagen no es válido",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Referencia al modelo User
    required: [true, "El autor es obligatorio"],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId], // Array de ObjectId de usuarios
    ref: "user",
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now, // Se asigna automáticamente la fecha de creación
  },
});

module.exports = mongoose.model("card", cardSchema);
