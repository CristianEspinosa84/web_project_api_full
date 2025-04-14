import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Images/Vector.jpg";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <div className="auth">
      <div className="header__auth">
        <img src={logo} alt="Logo" className="header__logo" />
        <h2 className="header__title">
          {" "}
          <Link to="/signup">Registrase</Link>
        </h2>
      </div>
      <h2 className="auth__title">Inicia sesión</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="auth__button" type="submit">
          Iniciar sesión
        </button>
        <p className="auth__register-text">
          ¿Aún no eres miembro? <Link to="/signup">Regístrate aquí</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
