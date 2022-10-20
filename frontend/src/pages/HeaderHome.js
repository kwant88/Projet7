import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import "../css/styles.css";

const HeaderHome = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    if (!localStorage.token) {
      navigate("/login");
    }
  }, []);
  return (
    <header className="Top-header">
      <nav className="navbar">
        <a className="navbar-logo" href="/">
          <img src="/logo.png" width={120} height={120} alt="logo Groupomania" />
        </a>

        <div>
          <button onClick={logout}>Déconnexion</button>
        </div>
      </nav>
    </header>
  );
};

export default HeaderHome;
