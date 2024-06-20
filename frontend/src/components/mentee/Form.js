import React, { useContext, useRef, useState } from "react";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import style from "../../styles/LandingPage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Toast } from "primereact/toast";
import PropTypes from 'prop-types';
import useToken from "../../components/auth/useToken";

function Form({ setToken }) {
  const { user, setUser } = useContext(UserContext); // Retrieve user from context
  const { clearToken } = useToken();
  const toast = useRef(null);
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    mail: "",
    password: "",
  });
  const [locked, setLocked] = useState(true);

  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post("http://localhost:8080/useri/login", credentials);
      const userToken = {
        token: response.data.jwtToken,
        user: response.data.user,
      };
      setToken(userToken);
      setUser(response.data.user);

      // Navigate based on user status
      if (response.data.user.status === "junior") {
        navigate("/profile");
      } else if (response.data.user.status === "mentor") {
        navigate("/mentor-homepage");
      } else {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.current.show({
        severity: "fail",
        summary: "Failed",
        detail: "Wrong password",
        life: 3000,
      });
    }
  };

  const handleLogout = () => {
    clearToken();
    setUser(null);
    navigate("/");
  };

  const sendData = (e) => {
    e.preventDefault();
    handleLogin(info);
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
            value={info.mail}
            onChange={(e) => setInfo({ ...info, mail: e.target.value })}
          />
        </div>
        <div className={style.formRow}>
          <label htmlFor="password">Password</label>
          <div className={style.passwordRow}>
            <input
              type={locked ? "password" : "text"}
              id="password"
              value={info.password}
              onChange={(e) => setInfo({ ...info, password: e.target.value })}
            />
            <FontAwesomeIcon
              icon={locked ? faEyeSlash : faEye}
              onClick={changeLock}
              className={style.icon}
            />
          </div>
        </div>
        <div className={style.formButtons}>
          <Button
            className={style.btnLogin}
            content="Login"
            type="submit"
          />
        </div>
      </form>
     
    </>
  );
}

Form.propTypes = {
  setToken: PropTypes.func.isRequired
};

export default Form;
