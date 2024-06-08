import React, { useEffect, useState } from 'react'
import { Chart } from "primereact/chart";
import axios from "axios";

function PieChart({idCourse}) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [date, setDate] = useState({});
  
    useEffect(() => {
      getInfo();
    }, []);
  
    
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
        });
    };
  
    useEffect(()=>{
      setChartInfo(); 
  
    },[date])
  
    const setChartInfo = () => {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      console.log("aici sunt", date)
      const data = {
        labels: ["Promovate", "Nepromovate"],
        datasets: [
          {
            data: [
              date && date.promovate ? date.promovate : 60,
              date && date.nepromovate ? date.nepromovate : 40,
            ],
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
        aspectRatio: 0.9,
        plugins: {
            legend: {
                labels: {
                    color: textColor,
                    font: { size: 20 },
                    usePointStyle: true,

                }
            }
        },
  
      };
    
      setChartData(data);
      setChartOptions(options);
    };
    
  return (
    <div>  <Chart
    type="pie"
    data={chartData}
    options={chartOptions}
    className="w-full md:w-100rem"
  /></div>
  )
}

export default PieChart