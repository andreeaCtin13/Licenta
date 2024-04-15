import React, { useContext, useEffect, useRef, useState } from "react";
import style from "../../styles/mentor/MentorHomepage.module.css";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import axios from "axios";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";

function MentorHomepage() {
  const { user, setUser } = useContext(UserContext);
  const toast = useRef(null);
  const [cursuri, setCursuri] = useState([]);
  const [logoutDialog, setLogoutDialog] = useState(false);

  const handleLogout = () => {
    setLogoutDialog(true);
  };
  const getCursuri = async () => {
    axios
      .get(
        `http://localhost:8080/curs/getAllCursuriOfAMentor/${user.id_utilizator}`
      )
      .then((rez) => {
        console.log(rez.data.cursuri);
        setCursuri(rez.data.cursuri);
      })
      .catch((err) => {
        console.log(err);
        toast.current.show({
          severity: "fail",
          summary: "Failed",
          detail: "Eroare la incarcarea cursurilor",
          life: 3000,
        });
      });
  };

  useEffect(() => {
    getCursuri();
  }, []);

  return (
    <div className={style.mainContainer}>
      <Toast ref={toast} />

      <div className={style.zoneOfBtns}>
        <div className={style.btnCreateZone}>
          <Link to="/new-course">
            <Button
              className={style.btnCreate}
              content="Create a new course"
            ></Button>
          </Link>
        </div>

        <div className={style.btnCreateZone}>
          <Link to="/requests">
            <Button className={style.btnCreate} content="See requests"></Button>
          </Link>
        </div>
        <div className={style.btnCreateZone}>
          <Button
            className={style.btnCreate}
            content="Logout"
            onClick={handleLogout}
          ></Button>
        </div>
      </div>
      <h1>Hi, {user.nume}</h1>
      <div>
        <h2>Your Couses</h2>
        <div className={style.cursuriArea}>
          {user ? (
            cursuri ? (
              cursuri.map((c, index) => {
                return (
                  <div id={index} key={index} className={style.courseCard}>
                    <img
                      src={c.imagine_reprezentativa}
                      alt={c.denumire}
                      className={style.imageCourse}
                    />
                    <div>
                      <h2>
                        <Link
                          to={`/mentor-homepage/${c.id_curs}`}
                          className={style.link}
                        >
                          {c.denumire}
                        </Link>
                      </h2>
                      <div>{c.descriere}</div>
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

export default MentorHomepage;
