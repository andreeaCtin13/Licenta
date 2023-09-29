import React, { useState } from "react";
import style from "../../styles/LandingPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
function Form() {
  const [lock, setLock] = useState(true);

  const modifyLock = () => {
    setLock(!lock);
  };

  return (
    <>
      <form action="">
        <div className={style.formRow}>
          <label for="username">Username</label>
          <input type="text" id="username" />
        </div>
        <div className={style.formRow}>
          <label for="password">Password</label>
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
          <button className={style.btnLogin}>Login</button>
        </div>
      </form>
    </>
  );
}

export default Form;
