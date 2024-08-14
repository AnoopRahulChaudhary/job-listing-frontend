import { useState } from "react";
import { login } from "../api/user.js";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import GoBack from "../ui/GoBack.jsx";

function Login() {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");

  function handleChange(e) {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { statusCode, data, errorMessage } = await login(loginDetails);
    if (statusCode != 200) {
      setLoginError(errorMessage);
      return;
    }

    window.sessionStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    navigate("/");
  }

  return (
    <>
      <GoBack />
      <form className={styles.login_form} onSubmit={handleSubmit}>
        <input
          type="email"
          onChange={handleChange}
          name="email"
          value={loginDetails.email}
          placeholder="email"
        />
        <br />
        <input
          type="password"
          onChange={handleChange}
          name="password"
          value={loginDetails.password}
          placeholder="password"
        />
        <br />
        {loginError && <div>{loginError}</div>}
        <input type="submit" value={"Login"} />
      </form>
    </>
  );
}

export default Login;
