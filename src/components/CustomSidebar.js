// Sidebar.js
import React, { useContext, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import style from "../styles/Sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faGraduationCap,
  faUser,
  faArrowRightFromBracket,
  faShop,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { UserContext } from "../context/UserContext";
import { Dialog } from "primereact/dialog";

function CustomSidebar() {
  const [visible, setVisible] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
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
    setLogoutModal(true);
  };
  const closeSidebar = () => {
    setVisible(false);
  };

  return (
    <div className={style.containerSidebar}>
      <button onClick={() => setVisible(true)} className={style.showButton}>
        <FontAwesomeIcon icon={faBars} className={style.menuIcon} />
      </button>
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position="left"
        className={style.sidebar}
      >
        <div className={style.logoAppContainer}>
          <img src={Logo} alt="" className={style.logo} />
          <h1>LearnApp</h1>
        </div>
        <ul className={style.listOfCourses}>
          <li className={style.courseListItem}>
            {" "}
            <Link
              to="/profile"
              className={style.courseLink}
              onClick={closeSidebar}
            >
              <FontAwesomeIcon icon={faUser} className={style.iconListItem} />
              Profile
            </Link>
          </li>
          <li className={style.courseListItem}>
            {" "}
            <Link
              to="/topics"
              className={style.courseLink}
              onClick={closeSidebar}
            >
              <FontAwesomeIcon icon={faShop} className={style.iconListItem} />
              Courses Market
            </Link>
          </li>

          {coursesList.map((x, index) => {
            return (
              <li className={style.courseListItem}>
                {" "}
                <Link
                  className={style.courseLink}
                  to={"/course/" + index}
                  onClick={closeSidebar}
                >
                  <FontAwesomeIcon
                    icon={faGraduationCap}
                    className={style.iconListItem}
                  />
                  {x.title}
                </Link>
              </li>
            );
          })}
          <li className={style.courseListItem}>
            <button onClick={handleLogout} className={style.logoutButton}>
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className={style.iconListItem}
              />
              Logout
            </button>
          </li>
        </ul>
      </Sidebar>

      <Dialog
        visible={logoutModal}
        onHide={() => setLogoutModal(false)}
        className={style.modal}
      >
        Are you sure you want to logout?
        <div className={style.buttonsLogout}>
          <Link to="/">
            <button
              onClick={() => {
                setUser(false);
                setLogoutModal(false);
              }}
            >
              Yes
            </button>
          </Link>
          <button onClick={() => setLogoutModal(false)}>No</button>
        </div>
      </Dialog>
    </div>
  );
}

export default CustomSidebar;
