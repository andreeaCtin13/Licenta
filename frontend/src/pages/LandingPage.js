import React, { useState } from "react";
import style from "../styles/LandingPage.module.css";
import Form from "../components/mentee/Form";

function LandingPage() {
  const [register, setRegister] = useState(false);
  return (
    <div className={style.container}>
      <div className={style.heroImage}>
        <div className={style.heroText}>
          <h1 className={style.title}>LearnIT</h1>
          <div className={style.formLogin}>
            <Form></Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
