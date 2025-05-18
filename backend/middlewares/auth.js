const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  // Verificamos si viene algo como "Bearer token..."
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Autorización requerida" });
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

 try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log("📌 Payload decodificado:", payload);
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }

  req.user = payload;
  next();
};
module.exports = auth;
