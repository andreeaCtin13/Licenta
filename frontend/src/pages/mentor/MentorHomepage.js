import React, { useContext, useEffect, useRef, useState } from "react";
import style from "../../styles/mentor/MentorHomepage.module.css";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import axios from "axios";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import VerticalBarChart from "../../components/mentor/VerticalBarChart";

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
          <Link to="/new-course" className={style.nonUnderline}>
            <Button
              className={style.btnCreate}
              content="Crează un nou curs"
            ></Button>
          </Link>
        </div>

        <div className={style.btnCreateZone}>
          <Button
            className={style.btnCreate}
            content="Dezautentificare"
            onClick={handleLogout}
          ></Button>
        </div>
      </div>
      <h1>Hei, {user.nume}</h1>
      <VerticalBarChart />
      <div>
        <h2>Cursurile susținute de dvs.</h2>
        <div className={style.cursuriArea}>
          {user ? (
            cursuri.length != 0 ? (
              cursuri.map((c, index) => {
                const imageUrl = c.imagine_reprezentativa
                  ? `http://localhost:8080/${c.imagine_reprezentativa.replace(
                      /^.*[\\\/]/,
                      "images/"
                    )}`
                  : "default-image-url";

                return (
                  <div id={index} key={index} className={style.courseCard}>
                    <img
                      src={imageUrl}
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
              <div>Nicio clasă creată momentan.</div>
            )
          ) : (
            <div>Nicio clasă creată momentan.</div>
          )}
        </div>
      </div>
      <Dialog
        visible={logoutDialog}
        onHide={() => setLogoutDialog(false)}
        className={style.modal}
      >
        Sigur dorești să de dezautentifici?
        <div className={style.buttonsLogout}>
          <Link to="/">
            <Button
              onClick={() => {
                setUser(false);
                setLogoutDialog(false);
              }}
              className={style.btnModala}
              content={"Yes"}
            ></Button>
          </Link>
          <Button
            className={style.btnModala}
            onClick={() => setLogoutDialog(false)}
            content={"No"}
          ></Button>
        </div>
      </Dialog>
    </div>
  );
}

export default MentorHomepage;
