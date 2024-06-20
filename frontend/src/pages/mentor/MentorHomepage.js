import React, { useContext, useEffect, useRef, useState } from "react";
import style from "../../styles/mentor/MentorHomepage.module.css";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import axios from '../../axiosConfig/AxiosConfig'; 
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import VerticalBarChart from "../../components/mentor/VerticalBarChart";
import useToken from "../../components/auth/useToken";

function MentorHomepage() {
  const { user, setUser } = useContext(UserContext);
  const toast = useRef(null);
  const navigate = useNavigate();
  const [cursuri, setCursuri] = useState([]);
  const [logoutDialog, setLogoutDialog] = useState(false);
  const { clearToken } = useToken();



  // const handleLogout = () => {
  //   setUser(null); 
  //   sessionStorage.removeItem('token');
  //   setLogoutDialog(false);
  //   navigate('/'); 
  // };

  const handleLogout = () => {
    clearToken();
    setUser(null);
    navigate("/");
  };

  const getCursuri = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/curs/getAllCursuriOfAMentor/${user.id_utilizator}`);
      setCursuri(response.data.cursuri);
    } catch (error) {
      console.error("Error fetching cursuri:", error);
      toast.current.show({
        severity: "fail",
        summary: "Failed",
        detail: "Eroare la incarcarea cursurilor",
        life: 3000,
      });
    }
  };

  console.log("UTILIZATOR CONTEXT", user)

  useEffect(() => {
    if (user) {
      getCursuri();
    }
  }, [user]);

  return (
    <div className={style.mainContainer}>
      <Toast ref={toast} />

      <div className={style.zoneOfBtns}>
        <div className={style.btnCreateZone}>
          <Link to="/new-course" className={style.nonUnderline}>
            <Button
              className={style.btnCreate}
              content="Crează un nou curs"
            />
          </Link>
        </div>

        <div className={style.btnCreateZone}>
          <Button
            className={style.btnCreate}
            content="Deconectare"
            onClick={() => setLogoutDialog(true)}
          />
        </div>
      </div>
      <h1>Hei, {user ? user.nume : 'Nume utilizator'}</h1>
      <VerticalBarChart />
      <div>
        <h2>Cursurile susținute de dvs.</h2>
        <div className={style.cursuriArea}>
          {cursuri.length !== 0 ? (
            cursuri.map((c, index) => {
              const imageUrl = c.imagine_reprezentativa ? `http://localhost:8080/${c.imagine_reprezentativa.replace(/^.*[\\\/]/, "images/")}` : "default-image-url";
              return (
                <div id={index} key={index} className={style.courseCard}>
                  <img src={imageUrl} alt={c.denumire} className={style.imageCourse} />
                  <div>
                    <h2>
                      <Link to={`/mentor-homepage/${c.id_curs}`} className={style.link}>{c.denumire}</Link>
                    </h2>
                    <div>{c.descriere}</div>
                  </div>
                </div>
              );
            })
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
        Sigur dorești să te deconectezi?
        <div className={style.buttonsLogout}>
          <Button
            onClick={handleLogout}
            className={style.btnModala}
            content={"Da"}
          />
          <Button
            className={style.btnModala}
            onClick={() => setLogoutDialog(false)}
            content={"Nu"}
          />
        </div>
      </Dialog>
    </div>
  );
}

export default MentorHomepage;
