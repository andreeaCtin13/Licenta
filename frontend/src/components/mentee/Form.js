import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import style from "../../styles/LandingPage.module.css";
// import api from "../../api";
import axios from "axios";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/UserContext";
import { Toast } from "primereact/toast";

function Form() {
  const { user, setUser } = useContext(UserContext);
  const [locked, setLocked] = useState(true);
  const navigate = useNavigate();
  const toast = useRef(null);

  const [info, setInfo] = useState({
    mail: "",
    password: "",
  });

  const sendData = async (e) => {
    e.preventDefault();
    console.log(info);
    await axios
      .post("http://localhost:8080/useri/login", info)
      .then((response) => {
        setUser(response.data.user);
        if (response.data.user.status === "junior") navigate("/profile");
        else if (response.data.user.status === "mentor") navigate("/profile");
        else navigate("/admin");
      })
      .catch((error) => {
        console.error("Error:", error.message);
        toast.current.show({
          severity: "fail",
          summary: "Failed",
          detail: "Wrong password",
          life: 3000,
        });
        console.log("");
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
      <Toast ref={toast} />
      <form className={style.formStyle}>
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
            onClick={sendData}
          ></Button>
        </div>
      </form>
    </>
  );
}

export default Form;
