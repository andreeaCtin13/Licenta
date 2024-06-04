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
    try {
      const assignmentsResponse = await axios.get(
        `http://localhost:8080/istoricCerinte/getIstoricRezolvariPerUser/${user.id_utilizator}`
      );
      setNoIstoricAssigments(assignmentsResponse.data.istoric);

      const punctajeResponse = await axios.get(
        `http://localhost:8080/istoricuriPunctaje/getPunctajePerUtilizator/${user.id_utilizator}`
      );
      setNoIstoricPunctaje(punctajeResponse.data.numarTestePeLuni);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setData();
  }, [user]);

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
            noIstoricPunctaje["ianuarie"] || 0,
            noIstoricPunctaje["februarie"] || 0,
            noIstoricPunctaje["martie"] || 0,
            noIstoricPunctaje["aprilie"] || 0,
            noIstoricPunctaje["mai"] || 0,
            noIstoricPunctaje["iunie"] || 0,
            noIstoricPunctaje["iulie"] || 0,
            noIstoricPunctaje["august"] || 0,
            noIstoricPunctaje["septembrie"] || 0,
            noIstoricPunctaje["octombrie"] || 0,
            noIstoricPunctaje["noiembrie"] || 0,
            noIstoricPunctaje["decembrie"] || 0,
          ],
        },
        {
          label: "Număr cerințe rezolvate",
          backgroundColor: documentStyle.getPropertyValue("--pink-500"),
          borderColor: documentStyle.getPropertyValue("--pink-500"),
          data: [
            noIstoricAssigments["ianuarie"] || 0,
            noIstoricAssigments["februarie"] || 0,
            noIstoricAssigments["martie"] || 0,
            noIstoricAssigments["aprilie"] || 0,
            noIstoricAssigments["mai"] || 0,
            noIstoricAssigments["iunie"] || 0,
            noIstoricAssigments["iulie"] || 0,
            noIstoricAssigments["august"] || 0,
            noIstoricAssigments["septembrie"] || 0,
            noIstoricAssigments["octombrie"] || 0,
            noIstoricAssigments["noiembrie"] || 0,
            noIstoricAssigments["decembrie"] || 0,
          ],
        },
      ],
    };

    const options = {
      indexAxis: "y",
      maintainAspectRatio: false,
      aspectRatio: 0.5,
      plugins: {
        legend: {
          labels: {
            fontColor: textColor,
            font: { size: 20 },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 300,
              size: 17,
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
            font: { size: 20 },
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
  }, [noIstoricPunctaje, noIstoricAssigments]);

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

  const updatePassword = async () => {
    if (newPass !== "") {
      try {
        await axios.put("http://localhost:8080/useri/actualizare", {
          id_utilizator: user.id_utilizator,
          password: newPass,
        });
        console.log("Password updated successfully");
      } catch (error) {
        console.error("Error updating password:", error);
      }
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
        onClick={updatePassword}
        className={`${style.btnModal} ${style.btnChange}`}
      />
    </div>
  );

  return (
    <div className={style.profileMain}>
      <div className={style.profileCard}>
        <img src={ProfilePic} alt="profile" className={style.profilePic} />
        <h1>{user ? user.nume : "no user"}</h1>
        <div>
          <Button
            content="Change Password"
            className={style.btnChangePassword}
            onClick={() => show("top-right")}
          />
        </div>
        <div className={style.containerGrafic}>
          <h2 className={style.h2Title}>Progresul tău anul acesta</h2>
          <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
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
            <label>New Password</label>
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
