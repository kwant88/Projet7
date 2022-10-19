import logo from "../backend/images/icon-left-font-monochrome-white";

const Header = () => {
  return (
    <header className="Top-header">
      <nav className="navbar">
        <a className="navbar-logo" href="/">
          <img src={logo} width={80} height={80} alt="logo Groupomania" />
        </a>

        <div>
          <a className="navbar-logo" href="/signup">
            Inscription
          </a>
          <a className="navbar-logo" href="/login">
            Connexion
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;