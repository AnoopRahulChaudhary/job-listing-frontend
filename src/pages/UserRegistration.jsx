import { useState } from "react";
import styles from "./UserRegistration.module.css";
import { registerUser } from "../api/user";
import { AxiosError } from "axios";

function UserRegistration() {
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
      const response = await registerUser(registrationData);
      if (response.status == 201) {
        setUserRegistered(true);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage("Faild to register.");
    }
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
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </div>
  );
}

export default UserRegistration;
