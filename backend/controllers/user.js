const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 📌 Obtener todos los usuarios
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).json(users))
    .catch(() =>
      res.status(500).json({ message: "Error interno del servidor" })
    );
};

// 📌 Obtener un usuario por ID con orFail()
const getUserById = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).json({ message: "ID de usuario inválido" });
      }
      res
        .status(err.statusCode || 500)
        .json({ message: err.message || "Error interno del servidor" });
    });
};

// 📌 Crear un nuevo usuario con validación
const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        about,
        avatar,
        email,
        password: hash, // Guardamos la contraseña ya cifrada
      });
    })
    .then((user) => {
      // Devolvemos solo los datos visibles del usuario (sin la contraseña)
      res.status(201).send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })

    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .json({ message: "Datos inválidos para crear usuario" });
      }
      if (err.code === 11000) {
        return res
          .status(409)
          .json({ message: "El correo ya está registrado" });
      }
      return next(err); // ✅ este return no es obligatorio pero es buena práctica
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  // Buscar al usuario por email y pedir el password cifrado (select: false)
  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Correo o contraseña incorrectos" });
      }

      // Comparar contraseñas
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return res
            .status(401)
            .json({ message: "Correo o contraseña incorrectos" });
        }

        // Generar el token JWT
        const token = jwt.sign(
          { _id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        res.send({ token }); // Enviamos el token al cliente
      });
    })
    .catch(next);
};





// 📌 Actualizar perfil (name y about)
const updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .json({ message: "Datos inválidos para actualizar perfil" });
      }
      res
        .status(err.statusCode || 500)
        .json({ message: err.message || "Error interno del servidor" });
    });
};

// 📌 Actualizar avatar
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).json({ message: "URL del avatar inválida" });
      }
      res
        .status(err.statusCode || 500)
        .json({ message: err.message || "Error interno del servidor" });
    });
};

// 📌 Exportar todas las funciones
module.exports = {
  getUsers,
  getUserById,
  createUser,
  login,
  updateUserProfile,
  updateUserAvatar,
};
