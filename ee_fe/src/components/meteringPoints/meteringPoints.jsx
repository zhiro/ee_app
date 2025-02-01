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
        return (

            <div className="graph-container">
                <h2>Metering Points</h2>
                <div>To see the data of your consumption, please log in to the portal first.</div>
            </div>
            )
    }

    return (
        <div className="graph-container">
            <h2>Metering Points</h2>
            {error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : meteringPoints.length > 0 ? (
                <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                    {meteringPoints.map((meteringPoint) => (
                        <li
                            key={meteringPoint.meteringPointId}
                            style={{ marginBottom: "10px" }}
                        >
                            <div style={{ textAlign: "left" }}>
                                <strong>Address:</strong>
                                <div>
                                <span
                                    onClick={() =>
                                        navigate(
                                            `/metering/${meteringPoint.meteringPointId}/consumption`
                                        )
                                    }
                                    style={{
                                        cursor: "pointer",
                                        display: "inline-block", // Ensures it's only clickable around the address
                                    }}
                                >
                                    {meteringPoint.address}
                                </span>
                                </div>
                            </div>
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
