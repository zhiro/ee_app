import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MeteringService from "../../../services/MeteringService";

const MeteringConsumption = () => {
    const { meteringPointId } = useParams();
    const [consumptionData, setConsumptionData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchConsumptionData();
    }, [meteringPointId]); // Fetch when meteringPointId changes

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

    return (
        <div>
            <h1>Consumption Data for Metering Point {meteringPointId}</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : consumptionData.length > 0 ? (
                <ul>
                    <pre>{JSON.stringify(consumptionData, null, 2)}</pre>
                    {consumptionData.map((entry, index) => (
                        <li key={index}>
                            <strong>Date:</strong> {entry.date} | <strong>Consumption:</strong> {entry.amount} kWh
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No consumption data available.</p>
            )}
        </div>
    );
};

export default MeteringConsumption;
