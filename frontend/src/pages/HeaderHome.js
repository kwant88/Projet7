import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
          <img src="/logo.png" width={80} height={80} alt="logo Groupomania" />
        </a>

        <div>
          <button onClick={logout}>Déconnexion</button>
        </div>
      </nav>
    </header>
  );
};

export default HeaderHome;
