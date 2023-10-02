import React, { useContext, useEffect } from "react";
import style from "../../styles/admin/AdminHomepage.module.css";
import currentUser from "../../data/mentor.json";
import { UserContext } from "../../context/UserContext";
function AdminHomepage() {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    setUser(currentUser);
  }, []);
  return (
    <div className={style.mainContainer}>
      <h1>Hi, Admin!!!</h1>
      <button>Create Account</button>
    </div>
  );
}

export default AdminHomepage;
