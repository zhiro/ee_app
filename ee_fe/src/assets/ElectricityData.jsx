import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./ElectricityData.css"

const ElectricityData = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/electricity", {
                    params: {
                        startDateTime: "2023-12-31T22:00:00.000Z",
                        endDateTime: "2024-12-31T21:59:59.999Z",
                        resolution: "one_month",
                    },
                });


                const formattedData = response.data.map((entry) => ({
                    date: new Date(entry.fromDateTime).toLocaleDateString("en-GB", { month: "short", year: "numeric" }),
                    price: entry.centsPerKwh,
                }));

                setData(formattedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="graph-container">
            <h2>Electricity Price Over Time</h2>
            <ResponsiveContainer width="90%" height={400}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis label={{ value: "Cents per kWh", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ElectricityData;
