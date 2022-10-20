import "../css/styles.css";

const Header = () => {
  return (
    <header className="Top-header">
      <nav className="navbar">
        <a className="navbar-logo" href="/">
          <img src="/logo.png" width={100} height={100}  alt="logo Groupomania" />
        </a>

        <div>
          <a className="navbar-logo" href="/signup">
            Inscription
          </a>
          <br />
          <a className="navbar-logo" href="/login">
            Connexion
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
