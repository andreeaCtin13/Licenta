import React, { useContext, useRef, useState } from "react";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import style from "../../styles/LandingPage.module.css";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/UserContext";
import { Toast } from "primereact/toast";

function Form() {
  const { loginUser } = useContext(UserContext);
  const [locked, setLocked] = useState(true);
  const navigate = useNavigate();
  const toast = useRef(null);

  const [info, setInfo] = useState({
    mail: "",
    password: "",
  });

  const sendData = async (e) => {
    e.preventDefault();
    loginUser(info, navigate, toast);
  };

  const changeLock = () => {
    setLocked(!locked);
  };

  return (
    <>
      <Toast ref={toast} />
      <form className={style.formStyle} onSubmit={sendData}>
        <div className={style.formRow}>
          <label htmlFor="mail">Mail</label>
          <input
            type="text"
            id="mail"
            onChange={(e) => setInfo({ ...info, mail: e.target.value })}
          />
        </div>
        <div className={style.formRow}>
          <label htmlFor="password">Password</label>
          {locked ? (
            <div className={style.passwordRow}>
              <input
                type="password"
                id="password"
                onChange={(e) => setInfo({ ...info, password: e.target.value })}
              />
              <FontAwesomeIcon
                onClick={changeLock}
                className={style.icon}
                icon={faEyeSlash}
              />
            </div>
          ) : (
            <div className={style.passwordRow}>
              <input
                type="text"
                id="password"
                onChange={(e) => setInfo({ ...info, password: e.target.value })}
              />
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
            type="submit"
          ></Button>
        </div>
      </form>
    </>
  );
}

export default Form;
