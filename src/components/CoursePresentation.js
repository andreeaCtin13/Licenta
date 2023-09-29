import React, { useEffect, useState } from "react";
import style from "../styles/mentee/CoursePresentation.module.css";
import { Link } from "react-router-dom";

function CoursePresentation({ id, title, image, description }) {
  if (description.length > 50) {
    let desc = description.slice(0, 30);
    desc += "... see more";
    description = desc;
  }

  return (
    <div className={style.courseContainer}>
      <Link to={`/course-summary/${id}`} className={style.link}>
        <img src={image} alt="" className={style.courseImage} />
        <h2 className={style.tooManyDetails}>{title}</h2>
        <div>{description}</div>
      </Link>
    </div>
  );
}

export default CoursePresentation;
