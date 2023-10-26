import React from "react";
import style from "../styles/General.module.css";

function Button({ content, className, onClick }) {
  return (
    <button className={`${style.btn} ${className}`} onClick={onClick}>
      {content}
    </button>
  );
}

export default Button;
