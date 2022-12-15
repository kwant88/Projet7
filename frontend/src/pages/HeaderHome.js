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
    <header>
    <div class="header-grid">
      <div class="navbar-logo" href="/">
        <img src="/logo.png"  alt="logo Groupomania" />
      </div>

      <nav class="main-nav">
       
      </nav>
      <div class="deco-button">
          <button onClick={logout}>Déconnexion</button>
        </div>
  </div>
  </header>
  );
};
        
export default HeaderHome;
