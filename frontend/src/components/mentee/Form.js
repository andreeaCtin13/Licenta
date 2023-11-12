import React, { useState } from "react";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import style from "../../styles/LandingPage.module.css";
function Form() {
  const [locked, setLocked] = useState(true);

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
          <Button className={style.btnLogin} content="Login"></Button>
        </div>
      </form>
    </>
  );
}

export default Form;
