import React, { useEffect, useState } from "react";
import MeteringService from "../../services/MeteringService";
import { useNavigate } from "react-router-dom";

const MeteringPoints = () => {
    const [meteringPoints, setMeteringPoints] = useState([]);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(token !== null);

        if (isLoggedIn && token) {
            fetchMeteringPoints(token);
        }
    }, [isLoggedIn]);

    const fetchMeteringPoints = async (token) => {
        try {
            const data = await MeteringService.fetchMeteringPoints(token);
            setMeteringPoints(data);
        } catch (err) {
            setError("Error fetching metering points: " + err.message);
        }
    };

    if (!isLoggedIn) {
        return <div>To see the data of your consumption, please log in to the portal first.</div>;
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
