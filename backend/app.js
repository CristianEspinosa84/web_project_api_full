require("dotenv").config();
console.log("JWT cargado:", process.env.JWT_SECRET);

const express = require("express");
const mongoose = require("mongoose");


const { createUser, login } = require("./controllers/user");
const userRoutes = require("./routes/user");
const cardRoutes = require("./routes/card");
const auth = require("./middlewares/auth");
const { celebrate, Joi, errors } = require("celebrate");
const validator = require("validator");
const expressWinston = require("express-winston");
const winston = require("winston");
const path = require("path");
const cors = require('cors');

const app = express();

// ✅ Habilitar CORN
const allowedOrigins = [
  "https://ericespinosa17.chickenkiller.com",
  "http://localhost:8080"
];

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("🔄 Origin recibido:", origin); // opcional para debug
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const PORT = 3000;

// Middleware para recibir JSON
app.use(express.json());

// 📝 Registrar todas las solicitudes entrantes en request.log
app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.File({
        filename: path.join(__dirname, "request.log"),
      }),
    ],
    format: winston.format.json(),
  })
);

// 🚀 Rutas públicas
// Validación personalizada para URLs
const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) return value;
  return helpers.message("La URL no es válida");
};

// Rutas públicas con validación
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).optional(),
      about: Joi.string().min(2).max(30).optional(),
      avatar: Joi.string().custom(validateUrl).optional(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser
);

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);

// 🛡️ Aplicamos auth desde aquí
app.use(auth);

// 🛡️ Rutas protegidas
app.use("/users", userRoutes);
app.use("/cards", cardRoutes);

// 🛠 Registrar todos los errores en error.log
app.use(
  expressWinston.errorLogger({
    transports: [
      new winston.transports.File({
        filename: path.join(__dirname, "error.log"),
      }),
    ],
    format: winston.format.json(),
  })
);

app.use(errors()); // errors de celebrate

const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler); // 👈 aquí se manejan todos los errores

// 🚫 Ruta para manejar errores 404
app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

//  Conexión a MongoDB
mongoose
  .connect("mongodb://localhost:27017/aroundb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("🔥 Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

// 🚀 Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
