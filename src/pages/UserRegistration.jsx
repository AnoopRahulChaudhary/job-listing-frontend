import { useState, use } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserRegistration.module.css";
import { registerUser } from "../api/user";

function UserRegistration() {
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [userRegistered, setUserRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleOnChange(e) {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data, errorMessage } = await registerUser(registrationData);
      if (errorMessage) {
        setErrorMessage(errorMessage);
        return;
      }

      setUserRegistered(true);
    } catch (error) {
      setErrorMessage("Faild to register.");
    }
  }

  function handleLoginClick(e) {
    navigate("/login");
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleOnChange}
          name="name"
          placeholder="Name"
        />
        <br /> <br />
        <input
          type="email"
          onChange={handleOnChange}
          name="email"
          placeholder="Email"
        />
        <br /> <br />
        <input
          type="number"
          onChange={handleOnChange}
          name="mobile"
          placeholder="Mobile"
        />
        <br /> <br />
        <input
          type="password"
          onChange={handleOnChange}
          name="password"
          placeholder="Password"
        />
        <br /> <br />
        <input type="submit" value="Register" />
        {userRegistered && <div>Registeration Successfull</div>}
        {userRegistered && <button onClick={handleLoginClick}>Login</button>}
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </div>
  );
}

export default UserRegistration;
