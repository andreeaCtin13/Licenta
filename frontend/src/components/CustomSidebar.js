import React, { useContext, useState } from "react";
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

function CustomSidebar() {
  const [logoutDialog, setLogoutDialog] = useState(false);
  const [visibleSidebar, setVisibleSidebar] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const coursesList = [
    {
      videos: [
        {
          url: "https://youtu.be/shOZcaQyS_k?si=NQ__zREsW1rwSarg",
          title: "jbkdresvf",
        },
        {
          url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
          title: "rfef",
        },
        {
          url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
          title: "rfef",
        },
        {
          url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
          title: "rfef",
        },
        {
          url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
          title: "rfef",
        },
        {
          url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
          title: "rfef",
        },
        {
          url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
          title: "rfef",
        },
        {
          url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
          title: "rfef",
        },
        {
          url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
          title: "rfef",
        },
      ],
      pdfs: "vedem noi",
      title: "Curs de agatat cu Silviu Faiar",
    },
    {
      videos: [
        {
          url: "https://youtu.be/shOZcaQyS_k?si=NQ__zREsW1rwSarg",
          title: "jbkdresvf",
        },
        {
          url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
          title: "rfef",
        },
        {
          url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
          title: "rfef",
        },
        {
          url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
          title: "rfef",
        },
        {
          url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
          title: "rfef",
        },
        {
          url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
          title: "rfef",
        },
        {
          url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
          title: "rfef",
        },
        {
          url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
          title: "rfef",
        },
        {
          url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
          title: "rfef",
        },
      ],
      pdfs: "vedem noi",
      title: "Mister React",
    },
  ];

  const handleLogout = () => {
    setLogoutDialog(true);
  };
  const closeSidebarEvent = () => {
    setVisibleSidebar(false);
  };

  return (
    <div className={style.containerSidebar}>
      <button
        onClick={() => setVisibleSidebar(true)}
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
              <li key={indx} className={style.courseListItem}>
                <Link
                  className={style.courseLink}
                  to={"/course/" + indx}
                  onClick={closeSidebarEvent}
                >
                  <FontAwesomeIcon
                    className={style.iconListItem}
                    icon={faGraduationCap}
                  />
                  {course.title}
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
