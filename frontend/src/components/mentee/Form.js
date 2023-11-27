import React, { useContext, useEffect, useState } from "react";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import style from "../../styles/LandingPage.module.css";
// import api from "../../api";
import axios from "axios";
// import { UserContext } from "../../context/UserContext";

function Form() {
  // const { user, setUser } = useContext(UserContext);
  const [locked, setLocked] = useState(true);
  const user = {
    mail: "andreea@gmail.com",
    password: "andreea",
  };

  const sendData = async (e) => {
    e.preventDefault();
    await axios
      .get("http://localhost:8080/useri/login", user)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error.message);
        if (error.response) {
          console.error("Status:", error.response.status);
          console.error("Data:", error.response.data);
        } else if (error.request) {
          console.error("No response received");
        } else {
          console.error("Error setting up the request:", error.message);
        }
      });
  };

  const changeLock = () => {
    setLocked(!locked);
  };

  return (
    <>
      <form className={style.formStyle}>
        <div className={style.formRow}>
          <label htmlFor="mail">Mail</label>
          <input type="text" id="mail" />
        </div>
        <div className={style.formRow}>
          <label htmlFor="password">Password</label>
          {locked ? (
            <div className={style.passwordRow}>
              <input type="password" id="password" />
              <FontAwesomeIcon
                onClick={changeLock}
                className={style.icon}
                icon={faEyeSlash}
              />
            </div>
          ) : (
            <div className={style.passwordRow}>
              <input type="text" id="password" />
              <FontAwesomeIcon
                icon={faEye}
                onClick={changeLock}
                className={style.icon}
              />
            </div>
          )}
        </div>
        <div className={style.formButtons}>
          <Button
            className={style.btnLogin}
            content="Login"
            onClick={sendData}
          ></Button>
        </div>
      </form>
    </>
  );
}

export default Form;
