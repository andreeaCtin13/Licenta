import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import axios from "axios";

function LineChart({ idCourse }) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [dateChart, setDateChart] = useState({});

    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/istoricuriPunctaje/getPunctajeLunare/${idCourse}`);
            let date = response.data.numarTestePromovatePerLuna
      
            setDateChart(date);
        } catch (error) {
            console.log("Error:", error);
        }
    }

    useEffect(() => {
        getData();
    }, [idCourse]);

    function capitalizeFirstLetter(string) {
        if (typeof string !== 'string' || string.length === 0) {
            return string;
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const monthNames = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
        
        const data = {
            labels: monthNames.map(capitalizeFirstLetter),
            datasets: [
                {
                    label: 'Punctaje Obținute',
                    data: monthNames.map(month => dateChart[month.toLowerCase()]),
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    tension: 0.4
                }
            ]
        };

        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        font: { size: 20 },
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColor,
                        font: { size: 20 },
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColor,
                        font: { size: 20 },
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [dateChart]);

    return (
        <div>
            <Chart
                type="line"
                data={chartData}
                options={chartOptions}
                className="w-full md:w-100rem"
            />
        </div>
    )
}

export default LineChart;
