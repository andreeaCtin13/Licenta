import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import style from "../../styles/admin/CreateUserForm.module.css";
function CreateUserForm() {
  const [lock, setLock] = useState(true);

  const modifyLock = () => {
    setLock(!lock);
  };
  return (
    <form className={style.form}>
      <div className={style.formRow}>
        <label htmlFor="">E-mail</label>
        <input type="text" />
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
        <button className={style.btnCreateAccount}>Create Account</button>
      </div>
    </form>
  );
}

export default CreateUserForm;
