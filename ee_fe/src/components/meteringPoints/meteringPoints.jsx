import React, { useEffect, useState } from "react";
import MeteringService from "../../services/MeteringService"; // Ensure the path is correct
import { useNavigate } from "react-router-dom";

const MeteringPoints = () => {
    const [meteringPoints, setMeteringPoints] = useState([]);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(token !== null);

        // Fetch metering points if user is logged in
        if (isLoggedIn && token) {
            fetchMeteringPoints(token);
        }
    }, [isLoggedIn]); // Depend on isLoggedIn to trigger the fetch

    // Fetch metering points using MeteringService
    const fetchMeteringPoints = async (token) => {
        try {
            const data = await MeteringService.fetchMeteringPoints(token); // Get data from service
            setMeteringPoints(data); // Set the data into state
        } catch (err) {
            setError("Error fetching metering points: " + err.message); // Handle errors
        }
    };

    if (!isLoggedIn) {
        return <div>You need to be logged in to view metering points data.</div>;
    }

    return (
        <div>
            <h1>Metering Points</h1>
            {error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : meteringPoints.length > 0 ? (
                <ul>
                    {meteringPoints.map((meteringPoint) => (
                        <li
                            key={meteringPoint.meteringPointId}
                            onClick={() => navigate(`/metering/${meteringPoint.meteringPointId}/consumption`)}
                            style={{ cursor: "pointer", marginBottom: "10px" }}
                        >
                            <div><strong>Address:</strong> {meteringPoint.address}</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MeteringPoints;
