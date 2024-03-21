import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faGraduationCap,
  faUser,
  faArrowRightFromBracket,
  faShop,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import { UserContext } from "../context/UserContext";
import { Dialog } from "primereact/dialog";

import Button from "./Button";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Logo from "../assets/logo.png";
import style from "../styles/Sidebar.module.css";
import axios from "axios";

function CustomSidebar() {
  const [logoutDialog, setLogoutDialog] = useState(false);
  const [visibleSidebar, setVisibleSidebar] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [coursesList, setCoursesList] = useState([]);

  const callData = async () => {
    console.log("ID USER: ", user.id_utilizator);
    await axios
      .get(
        `http://localhost:8080/cereriCurs/getAllCursuriOfAUser/${user.id_utilizator}`
      )
      .then(async (rez) => {
        const cereri_accepted = rez.data.rezultat;
        console.log("cereri", cereri_accepted);
        for (let i = 0; i < cereri_accepted.length; i++) {
          await axios
            .get(
              `http://localhost:8080/curs/getById/${cereri_accepted[i].id_curs}`
            )
            .then((rez) => {
              setCoursesList([rez.data.curs]);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    setLogoutDialog(true);
  };
  const closeSidebarEvent = () => {
    setVisibleSidebar(false);
  };

  return (
    <div className={style.containerSidebar}>
      <button
        onClick={() => {
          setVisibleSidebar(true);
          callData();
        }}
        className={style.showButton}
      >
        <FontAwesomeIcon icon={faBars} className={style.menuIcon} />
      </button>
      <Sidebar
        visible={visibleSidebar}
        className={style.sidebar}
        position="left"
        onHide={() => setVisibleSidebar(false)}
      >
        <div className={style.logoAppContainer}>
          <img src={Logo} alt="logo_learnIT" className={style.logo} />
          <h1>LearnIT</h1>
        </div>
        <ul className={style.listOfCourses}>
          <li className={style.courseListItem}>
            <Link
              to="/profile"
              className={style.courseLink}
              onClick={closeSidebarEvent}
            >
              <FontAwesomeIcon className={style.iconListItem} icon={faUser} />
              Profile
            </Link>
          </li>
          <li className={style.courseListItem}>
            <Link
              to="/topics"
              onClick={closeSidebarEvent}
              className={style.courseLink}
            >
              <FontAwesomeIcon icon={faShop} className={style.iconListItem} />
              Courses Market
            </Link>
          </li>

          {coursesList.map((course, indx) => {
            return (
              <li key={course.id_curs} className={style.courseListItem}>
                <Link
                  className={style.courseLink}
                  to={"/course/" + course.id_curs}
                  onClick={closeSidebarEvent}
                >
                  <FontAwesomeIcon
                    className={style.iconListItem}
                    icon={faGraduationCap}
                  />
                  {course.denumire}
                </Link>
              </li>
            );
          })}
          <li className={style.courseListItem}>
            <Button
              onClick={handleLogout}
              className={style.logoutButton}
              content={
                <>
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    className={style.iconListItem}
                  />
                  Logout
                </>
              }
            ></Button>
          </li>
        </ul>
      </Sidebar>

      <Dialog
        visible={logoutDialog}
        onHide={() => setLogoutDialog(false)}
        className={style.modal}
      >
        Are you sure you want to logout?
        <div className={style.buttonsLogout}>
          <Link to="/">
            <Button
              onClick={() => {
                setUser(false);
                setLogoutDialog(false);
              }}
              content={"Yes"}
            ></Button>
          </Link>
          <Button
            onClick={() => setLogoutDialog(false)}
            content={"No"}
          ></Button>
        </div>
      </Dialog>
    </div>
  );
}

export default CustomSidebar;
