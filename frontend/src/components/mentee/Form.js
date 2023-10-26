import React, { useState } from "react";
import style from "../../styles/LandingPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
function Form() {
  const [lock, setLock] = useState(true);

  const modifyLock = () => {
    setLock(!lock);
  };

  return (
    <>
      <form action="" className={style.form}>
        <div className={style.formRow}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" />
        </div>
        <div className={style.formRow}>
          <label htmlFor="password">Password</label>
          {lock ? (
            <div className={style.passwordRow}>
              <input type="password" id="password" />
              <FontAwesomeIcon
                icon={faEyeSlash}
                onClick={modifyLock}
                className={style.icon}
              />
            </div>
          ) : (
            <div className={style.passwordRow}>
              <input type="text" id="password" />
              <FontAwesomeIcon
                icon={faEye}
                onClick={modifyLock}
                className={style.icon}
              />
            </div>
          )}
        </div>
        <div className={style.formButtons}>
          <Button content="Login" className={style.btnLogin}></Button>
        </div>
      </form>
    </>
  );
}

export default Form;
