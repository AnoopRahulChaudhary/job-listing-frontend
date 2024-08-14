import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

function Header() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setCurrentUser({ username });
    }
  }, []);

  function handleLogout() {
    window.sessionStorage.removeItem("token");
    localStorage.removeItem("username");
    setCurrentUser();
    navigate("/");
  }

  function handleLogoOnClick() {
    navigate("/");
  }

  return (
    <header className={styles.main_header}>
      <div
        onClick={handleLogoOnClick}
        style={{ display: "inline-block", cursor: "pointer" }}
        className="main-header__brand"
      >
        <h2>JobFinder</h2>
      </div>

      <nav className={styles.main_nav}>
        {!currentUser && (
          <ul className={styles.main_nav__items}>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        )}
        {currentUser && (
          <ul className={styles.main_nav__items}>
            <li>Hello! {currentUser.username}</li>
            <li>
              <Link to="/addJob">AddJob</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
            {/* <li>Recruiter Image</li> */}
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;
