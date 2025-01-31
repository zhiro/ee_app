import React, { useEffect, useState } from "react";
import { fetchElectricityData } from "../../services/electricityService.jsx";

const ElectricityData = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(token !== null);

    if (isLoggedIn) {
      const loadData = async () => {
        try {
          const fetchedData = await fetchElectricityData(2024);
          setData(fetchedData);
        } catch (err) {
          setError(err.message);
        }
      };

      loadData();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
        <div>
          <h1>Electricity Price Data</h1>
          <p>You need to be logged in to view this data.</p>
        </div>
    );
  }

  return (
      <div>
        <h1>Electricity Price Data</h1>
        {error ? (
            <p style={{ color: "red" }}>Error: {error}</p>
        ) : data.length > 0 ? (
            <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
            <p>Loading...</p>
        )}
      </div>
  );
};

export default ElectricityData;
