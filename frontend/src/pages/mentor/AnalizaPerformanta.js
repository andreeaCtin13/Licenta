import React, { useState, useEffect } from "react";
import style from "../../styles/mentor/AnalizaPerformanta.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { useParams } from "react-router";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Chart } from "primereact/chart";
import axios from "axios";

function AnalizaPerformanta() {
  const { idCourse } = useParams();
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [date, setDate] = useState({});

  const getInfo = async () => {
    await axios
      .get(
        `http://localhost:8080/istoricuriPunctaje/getPunctajePromovateOrNepromovate/${idCourse}`
      )
      .then((rez) => {
        setDate({
          promovate: rez.data.promovate,
          nepromovate: rez.data.nepromovate,
        });
        console.log(rez.data.nepromovate);
      });
  };

  useEffect(() => {
    getInfo();

    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["Promovate", "Nepromovate"],
      datasets: [
        {
          data: [date ? date.promovate : 60, date ? date.nepromovate : 40],
          backgroundColor: [
            documentStyle.getPropertyValue("--pink-500"),
            documentStyle.getPropertyValue("--purple-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--pink-300"),
            documentStyle.getPropertyValue("--purple-300"),
          ],
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className={style.mainContainer}>
      <Link to={`/mentor-homepage/${idCourse}`}>
        <Button
          className={style.btnBack}
          content={<FontAwesomeIcon icon={faArrowLeft} />}
        ></Button>
      </Link>
      <h1>Iată evoluția cursanților în cadrul testelor</h1>
      <Chart
        type="pie"
        data={chartData}
        options={chartOptions}
        className="w-full md:w-30rem"
      />
    </div>
  );
}

export default AnalizaPerformanta;
