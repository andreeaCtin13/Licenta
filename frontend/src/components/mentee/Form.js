import React, { useContext, useState } from "react";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import style from "../../styles/LandingPage.module.css";
import Axios from "axios";
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
    try {
      console.log("aici");
      await Axios.get("http://localhost:8080/useri/login", user)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log("ups, you have an error, look:", err);
        });
    } catch (err) {
      console.log(err);
    }
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
