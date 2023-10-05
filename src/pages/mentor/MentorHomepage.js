import React, { useContext, useEffect } from "react";
import style from "../../styles/mentor/MentorHomepage.module.css";
import currentUser from "../../data/mentor.json";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

function MentorHomepage() {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    setUser(currentUser);
  }, []);
  return (
    <div className={style.mainContainer}>
      <div className={style.btnCreateZone}>
        <Link to="/new-course">
          <Button
            className={style.btnCreate}
            content="Create a new course"
          ></Button>
        </Link>
      </div>
      <h1>Hi, {user.username}</h1>
      <div>
        <h2>Your Couses</h2>
        <div className={style.cursuriArea}>
          {user ? (
            user.classes.length > 0 ? (
              user.classes.map((c, index) => {
                return (
                  <div id={index} className={style.courseCard}>
                    <img
                      src={c.imagine}
                      alt="plang"
                      className={style.imageCourse}
                    />
                    <div>
                      <h2>
                        <Link
                          to={`/mentor-homepage/${index}`}
                          className={style.link}
                        >
                          {c.topic}
                        </Link>
                      </h2>
                      <div>{c.description}</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>No classes created.</div>
            )
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MentorHomepage;
