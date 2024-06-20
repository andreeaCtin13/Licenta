import React from "react";
import style from "../styles/LandingPage.module.css";
import Form from "../components/mentee/Form";
import Logo from "../assets/logo.png";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function LandingPage({ setToken }) {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className={style.container}>
      <div className={style.heroImage}>
        <div className={style.heroText}>
          <h1 className={style.title}>
            <img src={Logo} alt="logo" className={style.logo} />
          </h1>
          <div className={style.formLogin}>
            <Form setToken={setToken} setUser={setUser} user={user}></Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
