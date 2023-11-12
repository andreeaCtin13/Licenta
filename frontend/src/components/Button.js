import React from "react";
import style from "../styles/General.module.css";

function Button({ content, className, onClick }) {
  return (
    <button onClick={onClick} className={`${style.btn} ${className}`}>
      {content}
    </button>
  );
}

export default Button;
