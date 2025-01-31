import React, { useEffect, useState } from "react";
import ConsumptionService from "../../services/ConsumptionService";


const Consumption = () => {
    const [consumptionData, setConsumptionData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchConsumptionData();
    }, []);

    const fetchConsumptionData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Unauthorized. Please log in.");
                setLoading(false);
                return;
            }

            const data = await ConsumptionService.fetchAllConsumption(token);
            setConsumptionData(data);
        } catch (err) {
            setError("Error fetching consumption data: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>All Consumption Data</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : consumptionData.length > 0 ? (
                    <pre>{JSON.stringify(consumptionData, null, 2)}</pre>
                // <table border="1">
                //     <thead>
                //     <tr>
                //         <th>Date</th>
                //         <th>Metering Point</th>
                //         <th>Consumption (kWh)</th>
                //     </tr>
                //     </thead>
                //     <tbody>
                //     {consumptionData.map((entry) => (
                //         <tr key={entry.consumption_id}>
                //             <td>{new Date(entry.consumption_time).toLocaleDateString()}</td>
                //             <td>{entry.meteringPoint.address}</td>
                //             <td>{entry.amount}</td>
                //         </tr>
                //     ))}
                //     </tbody>
                // </table>
            ) : (
                <p>No consumption data available.</p>
            )}
        </div>
    );
};

export default Consumption;