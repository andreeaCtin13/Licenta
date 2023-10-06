import React, { useContext, useEffect, useState } from "react";
import ProfilePic from "../../assets/profileAvatar.jpeg";
import style from "../../styles/mentee/Profile.module.css";
import { UserContext } from "../../context/UserContext";
import currentUser from "../../data/user.json";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { Dialog } from "primereact/dialog";

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

  const footerContent = (
    <div className={style.btnZone}>
      <Button
        content="Cancel"
        onClick={() => setVisible(false)}
        className={`${style.btnModal} ${style.btnCancel}`}
      />
      <Button
        content="Change"
        onClick={() => setVisible(false)}
        className={`${style.btnModal} ${style.btnChange}`}
      />
    </div>
  );
  useEffect(() => {
    setUser(currentUser);
  }, []);

  return (
    <div className={style.profileMain}>
      <div className={style.profileCard}>
        <img src={ProfilePic} alt="ernjg" className={style.profilePic} />
        <h1>{user ? user.username : "no user"}</h1>
        <div>No of classes enrolled: {user ? user.classes.length : 0}</div>
        <div>
          <Button
            content="Change Password"
            className={style.btnChangePassword}
            onClick={() => show("top-right")}
          ></Button>
        </div>

        <div className={style.userCoursesArea}>
          {user ? (
            user.classes.length > 0 ? (
              <div>
                {" "}
                <h2>Your Classes</h2>
                <div className={style.userCoursesListArea}>
                  {user.classes.map((x, index) => {
                    return (
                      <div className={style.userCoursesCard}>
                        <h3>
                          <Link to={`/course/${index}`} className={style.link}>
                            {x.name_of_class}
                          </Link>
                        </h3>
                        <div>Mentored by {x.name_of_mentor}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className={style.noClasses}>No classes enrolled yet.</div>
            )
          ) : (
            <div></div>
          )}

          <Dialog
            header="Change the password"
            visible={visible}
            position={position}
            style={{ width: "30rem" }}
            onHide={() => setVisible(false)}
            footer={footerContent}
            draggable={false}
            resizable={false}
          >
            <div className={style.formRow}>
              <label htmlFor="">New Password</label>
              <input type="text" required />
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default Profile;
