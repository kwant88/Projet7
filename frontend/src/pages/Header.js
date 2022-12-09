import "../css/styles.css";

const Header = () => {
  return (
    <header>
      <div class="header-grid">
        <div class="navbar-logo" href="/">
          <img src="/logo.png"  alt="logo Groupomania" />
        </div>

        <nav class="main-nav">
          <ul>
                    <li>
                        <a className="navbar-logo" href="/signup">
            Inscription</a>
                    </li>
                    <li>
                        <a className="navbar-logo" href="/login">
            Connexion</a>
                    </li>
                </ul>
        </nav>
    </div>
    </header>
  );
};

export default Header;
