import React, { useState, useEffect, useContext } from 'react';
import { Chart } from 'primereact/chart';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

function VerticalBarChart() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const { user, setUser } = useContext(UserContext);

    const fetchData = async () => {
        try {
            await axios.get(`http://localhost:8080/cereriCurs/requestsChart/${user.id_utilizator}`).then((rez)=>{
                const data = rez.data.rez;
                console.log(data)
                if (Array.isArray(data) && data.length > 0) {
                    const labels = data.map(item => item.denumire);
                    const requestCounts = data.map(item => item.requestCount);
                    const newChartData = {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Număr de cereri',
                                data: requestCounts,
                                backgroundColor: '#e2b8cb',
                                borderColor: '#9d3e74',
                                borderWidth: 1
                            }
                        ]
                    };
    
                    const newChartOptions = {
                        maintainAspectRatio: false,
                        aspectRatio: 0.6,
                        plugins: {
                            legend: {
                                labels: {
                                    color: getComputedStyle(document.documentElement).getPropertyValue('--text-color'),
                                    font:{
                                        size:20
    
                                    }
                                },
                                

                            }
                        },
                        scales: {
                            x: {
                                ticks: {
                                    color: getComputedStyle(document.documentElement).getPropertyValue('--text-color'),
                                    font:{
                                        size:20
    
                                    }
                                },
                                grid: {
                                    color: getComputedStyle(document.documentElement).getPropertyValue('--surface-border'),
                                    font:{
                                        size:20
    
                                    }
                                }
                            },
                            y: {
                                ticks: {
                                    color: getComputedStyle(document.documentElement).getPropertyValue('--text-color')
                                },
                                grid: {
                                    color: getComputedStyle(document.documentElement).getPropertyValue('--surface-border')
                                }
                            }
                        }
                    };
    
                    setChartData(newChartData);
                    setChartOptions(newChartOptions);
                } else {
                    console.log("No data found");
                }
            });
            
        } catch (error) {
            console.error("Error fetching course requests:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="w-full md:w-100rem">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    );
}

export default VerticalBarChart;
