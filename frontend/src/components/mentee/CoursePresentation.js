import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "../../styles/mentee/CoursePresentation.module.css";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

function CoursePresentation({ description, id, title, image }) {
  const { user, setUser } = useContext(UserContext);

  if (description.length > 50) {
    let new_description = description.slice(0, 30);
    new_description += "... see more";
    description = new_description;
  }

  return (
    <div className={style.courseContainer}>
      <Link to={`/course-summary/${id}`} className={style.link}>
        <img
          src={image}
          alt={`courseImage_id${id}`}
          className={style.courseImage}
        />
        <h2 className={style.tooManyDetails}>{title}</h2>
        <h3>About this course</h3>
        <div>{description}</div>
      </Link>
    </div>
  );
}

export default CoursePresentation;
