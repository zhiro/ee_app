import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MeteringService from "../../../services/MeteringService";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const MeteringConsumption = () => {
    const { meteringPointId } = useParams();
    const [consumptionData, setConsumptionData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useEffect(() => {
        fetchConsumptionData();
    }, [meteringPointId]);

    useEffect(() => {
        groupDataByMonth(selectedYear);
    }, [consumptionData, selectedYear]);

    const fetchConsumptionData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Unauthorized. Please log in.");
                setLoading(false);
                return;
            }

            const data = await MeteringService.fetchConsumptionData(meteringPointId, token);
            setConsumptionData(data);
        } catch (err) {
            setError("Error fetching consumption data: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const groupDataByMonth = (year) => {
        const monthlyData = Array(12).fill(0);

        consumptionData.forEach(entry => {
            const date = new Date(entry.consumption_time);
            if (date.getFullYear() === year) {
                const monthIndex = date.getMonth();
                monthlyData[monthIndex] += entry.amount;
            }
        });

        const formattedData = monthlyData.map((value, index) => ({
            month: new Date(0, index).toLocaleString("en", { month: "short" }),
            consumption: value
        }));

        setFilteredData(formattedData);
    };

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    const availableYears = [...new Set(consumptionData.map(entry => new Date(entry.consumption_time).getFullYear()))].sort();

    return (
        <div className="graph-container">
            <h2>Monthly Consumption for Metering Point {meteringPointId}</h2>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <>
                    <label>Select Year: </label>
                    <select value={selectedYear} onChange={handleYearChange}>
                        {availableYears.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>

                    {filteredData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis label={{ value: "kWh", angle: -90, position: "insideLeft" }} />
                                <Tooltip />
                                <Bar dataKey="consumption" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <p>No data available for {selectedYear}.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default MeteringConsumption;
