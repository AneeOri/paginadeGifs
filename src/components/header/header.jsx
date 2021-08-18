import "./header.css";

export default function Header({ onThemeChange, darkMode }) {
  return (
    <div className="headerContainer">
      <div className="headerNavbar">
        <img src="./resources/logo-desktop.svg" alt="logo" />
        <button className="botonTema" onClick={() => onThemeChange(!darkMode)}>
          {darkMode ? "MODO LIGHT" : "MODO DARK"}
        </button>
      </div>
    </div>
  );
}
