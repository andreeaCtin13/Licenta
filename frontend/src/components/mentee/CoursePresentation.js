import React, { useContext } from "react";
import { Link } from "react-router-dom";
import style from "../../styles/mentee/CoursePresentation.module.css";
import { UserContext } from "../../context/UserContext";

// Utility function to format image URLs correctly
const formatImageUrl = (imagePath) => {
  const baseUrl = "http://localhost:8080/images"; // Change this to your actual base URL
  const imageName = imagePath.split("\\").pop().split("/").pop(); // Extracts the image file name
  return `${baseUrl}/${imageName}`;
};

function CoursePresentation({ description, id, title, image }) {
  const { user } = useContext(UserContext);

  if (description.length > 50) {
    let new_description = description.slice(0, 30);
    new_description += "... vezi mai multe";
    description = new_description;
  }

  const formattedImage = formatImageUrl(image);

  return (
    <div className={style.courseContainer}>
      <Link to={`/course-summary/${id}`} className={style.link}>
        <img
          src={formattedImage}
          alt={`courseImage_id${id}`}
          className={style.courseImage}
        />
        <h2 className={style.tooManyDetails}>{title}</h2>
        <h3>Despre acest curs</h3>
        <div className={style.courseDescription}>{description}</div>
      </Link>
    </div>
  );
}

export default CoursePresentation;
