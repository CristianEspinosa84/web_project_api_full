import React from "react";
import logo from "../Images/Vector.jpg"; // Asegúrate de que esta ruta sea correcta

function Header({ userEmail, onLogout, isLoggedIn }) {
  return (
    <header className="header">
      <div className="header__auth-logo">
        <img src={logo} alt="Logo" className="header__logo" />
        <div className="header__auth-left">
          <p className="header__auth-email">{userEmail}</p>
          <button className="header__auth-logout" onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>

      {isLoggedIn && <div className="header__right"></div>}
    </header>
  );
}

export default Header;
