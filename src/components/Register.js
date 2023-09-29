import React, { useState } from "react";
import style from "../styles/mentee/Register.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEyeSlash,
  faEye,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Register({ register, setRegister }) {
  const [lock, setLock] = useState(true);

  const modifyLock = () => {
    setLock(!lock);
  };

  return (
    <form>
      <div className={style.formRow}>
        <label htmlFor="" for="username">
          Username
        </label>
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
              className={style.iconPassword}
            />
          </div>
        ) : (
          <div className={style.passwordRow}>
            <input type="text" id="password" />
            <FontAwesomeIcon
              icon={faEye}
              onClick={modifyLock}
              className={style.iconPassword}
            />
          </div>
        )}
      </div>
      <div className={style.formRowCheck}>
        <label htmlFor="">Mentor Account</label>
        <input type="checkbox" />
      </div>
      <div className={style.formButtons}>
        <button
          className={style.btnBack}
          onClick={() => setRegister(!register)}
        >
          <FontAwesomeIcon icon={faArrowLeft} className={style.iconExit} />
        </button>
        <button className={style.createAccBtn}>
          <Link className={style.link}>Create Account</Link>
        </button>
      </div>
    </form>
  );
}

export default Register;
