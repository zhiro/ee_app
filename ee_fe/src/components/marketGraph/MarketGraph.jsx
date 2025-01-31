import React, { useEffect, useState } from "react";
import { fetchElectricityData } from "../../services/electricityService"; // Import service
import "./MarketGraph.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const MarketGraph = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchElectricityData(selectedYear);
      setData(fetchedData);
    };

    loadData();
  }, [selectedYear]);

  const currentYear = new Date().getFullYear();

  return (
      <div className="graph-container">
        <h2>Electricity Prices</h2>

        <div className="year-navigation">
        <span className="clickable-year" onClick={() => setSelectedYear(selectedYear - 1)}>
          {selectedYear - 1}
        </span>
          <span className="current-year">{selectedYear}</span>
          <span
              className={`clickable-year right ${selectedYear >= currentYear ? "disabled" : ""}`}
              onClick={() => selectedYear < currentYear && setSelectedYear(selectedYear + 1)} // Only increase year if less than current
          >
          {selectedYear + 1}
        </span>
        </div>

        <ResponsiveContainer width="90%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: "Cents per kWh", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Bar dataKey="centsPerKwhWithVat" fill="#8884d8" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
  );
};

export default MarketGraph;
