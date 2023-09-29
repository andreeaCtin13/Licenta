import React, { useState } from "react";
import style from "../styles/LandingPage.module.css";
import Form from "../components/Form";
import Register from "../components/Register";

function LandingPage() {
  const [register, setRegister] = useState(false);
  return (
    <div className={style.container}>
      <div className={style.heroImage}>
        <div className={style.heroText}>
          <h1 className={style.title}>Learnapp</h1>
          <div className={style.formLogin}>
            {register === false ? (
              <Form
                register={register}
                setRegister={() => setRegister()}
              ></Form>
            ) : (
              <Register
                register={register}
                setRegister={() => setRegister()}
              ></Register>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
