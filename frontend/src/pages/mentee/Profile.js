import React, { useContext, useEffect, useState } from "react";
import ProfilePic from "../../assets/profileAvatar.jpeg";
import style from "../../styles/mentee/Profile.module.css";
import { UserContext } from "../../context/UserContext";
import Button from "../../components/Button";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { Chart } from "primereact/chart";

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const [newPass, setNewPass] = useState("");

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const [noIstoricAssigments, setNoIstoricAssigments] = useState([]);
  const [noIstoricPunctaje, setNoIstoricPunctaje] = useState([]);
  const setData = async () => {
    await axios
      .get(
        `http://localhost:8080/istoricCerinte/getIstoricRezolvariPerUser/${user.id_utilizator}`
      )
      .then((rez) => {
        setNoIstoricAssigments(rez.data.istoric);
      });

    await axios
      .get(
        `http://localhost:8080/istoricuriPunctaje/getPunctajePerUtilizator/${user.id_utilizator}`
      )
      .then((rez) => {
        setNoIstoricPunctaje(rez.data.numarTestePeLuni);
      });
  };

  useEffect(() => {
    setData();
  }, []);

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-primary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: [
        "ianuarie",
        "februarie",
        "martie",
        "aprilie",
        "mai",
        "iunie",
        "iulie",
        "august",
        "septembrie",
        "octombrie",
        "noiembrie",
        "decembrie",
      ],
      datasets: [
        {
          label: "Număr teste promovate",
          backgroundColor: documentStyle.getPropertyValue("--purple-500"),
          borderColor: documentStyle.getPropertyValue("--purple-500"),
          data: [
            noIstoricPunctaje.hasOwnProperty("ianuarie")
              ? noIstoricPunctaje["ianuarie"]
              : 0,
            noIstoricPunctaje["februarie"] ? noIstoricPunctaje["februarie"] : 0,
            noIstoricPunctaje["martie"] ? noIstoricPunctaje["martie"] : 0,
            noIstoricPunctaje["aprilie"] ? noIstoricPunctaje["aprilie"] : 0,
            noIstoricPunctaje["mai"] ? noIstoricPunctaje["mai"] : 0,
            noIstoricPunctaje["iunie"] ? noIstoricPunctaje["iunie"] : 0,
            noIstoricPunctaje["iulie"] ? noIstoricPunctaje["iulie"] : 0,
            noIstoricPunctaje["august"] ? noIstoricPunctaje["august"] : 0,
            noIstoricPunctaje["septembrie"]
              ? noIstoricPunctaje["septembrie"]
              : 0,
            noIstoricPunctaje["octombrie"] ? noIstoricPunctaje["octombrie"] : 0,
            noIstoricPunctaje["noiembrie"] ? noIstoricPunctaje["noiembrie"] : 0,
            noIstoricPunctaje["decembrie"] ? noIstoricPunctaje["decembrie"] : 0,
          ],
        },
        {
          label: "Număr cerințe rezolvate",
          backgroundColor: documentStyle.getPropertyValue("--pink-500"),
          borderColor: documentStyle.getPropertyValue("--pink-500"),
          data: [
            noIstoricAssigments["ianuarie"]
              ? noIstoricAssigments["ianuarie"]
              : 0,
            noIstoricAssigments["februarie"]
              ? noIstoricAssigments["februarie"]
              : 0,
            noIstoricAssigments["martie"] ? noIstoricAssigments["martie"] : 0,
            noIstoricAssigments["aprilie"] ? noIstoricAssigments["aprilie"] : 0,
            noIstoricAssigments["mai"] ? noIstoricAssigments["mai"] : 0,
            noIstoricAssigments["iunie"] ? noIstoricAssigments["iunie"] : 0,
            noIstoricAssigments["iulie"] ? noIstoricAssigments["iulie"] : 0,
            noIstoricAssigments["august"] ? noIstoricAssigments["august"] : 0,
            noIstoricAssigments["septembrie"]
              ? noIstoricAssigments["septembrie"]
              : 0,
            noIstoricAssigments["octombrie"]
              ? noIstoricAssigments["octombrie"]
              : 0,
            noIstoricAssigments["noiembrie"]
              ? noIstoricAssigments["noiembrie"]
              : 0,
            noIstoricAssigments["decembrie"]
              ? noIstoricAssigments["decembrie"]
              : 0,
          ],
        },
      ],
    };
    const options = {
      indexAxis: "y",
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            fontColor: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [noIstoricAssigments]);

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };
  console.log(user);

  const updatePassword = async () => {
    if (newPass !== "") {
      console.log("new pass", newPass);
      await axios
        .put("http://localhost:8080/useri/actualizare", {
          id_utilizator: user.id_utilizator,
          password: newPass,
        })
        .then((rez) => {
          console.log("ce am modificat:", rez);
          console.log("totul ok");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setVisible(false);
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
        onClick={() => {
          updatePassword();
        }}
        className={`${style.btnModal} ${style.btnChange}`}
      />
    </div>
  );

  return (
    <div className={style.profileMain}>
      <div className={style.profileCard}>
        <img src={ProfilePic} alt="ernjg" className={style.profilePic} />
        <h1>{user ? user.nume : "no user"}</h1>
        {/* <div>No of classes enrolled: {user ? user.classes.length : 0}</div> */}
        <div>
          <Button
            content="Change Password"
            className={style.btnChangePassword}
            onClick={() => show("top-right")}
          ></Button>
        </div>
        <div className={style.containerGrafic}>
          <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
        {/* 
        <div className={style.userCoursesArea}>
          {user ? (
            user.classes.length > 0 ? (
              <div>
                {" "}
                <h2>Your Classes</h2>
                <div className={style.userCoursesListArea}>
                  {user.classes.map((x, index) => {
                    return (
                      <div key={index} className={style.userCoursesCard}>
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
        </div>*/}
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
            <input
              type="text"
              required
              onChange={(e) => setNewPass(e.target.value)}
            />
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default Profile;
