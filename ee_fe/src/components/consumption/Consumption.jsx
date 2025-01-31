import React, { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useConsumptionCombinedData from "./ConsumptionCombinedData";

const Consumption = () => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const { combinedData, loading, error } = useConsumptionCombinedData(selectedYear);

    const currentYear = new Date().getFullYear();

    return (
        <div className="graph-container">
            <h2>My Consumption</h2>

            <div className="year-navigation">
                <span className="clickable-year" onClick={() => setSelectedYear(selectedYear - 1)}>
                    {selectedYear - 1}
                </span>
                <span className="current-year">{selectedYear}</span>
                <span
                    className={`clickable-year right ${selectedYear >= currentYear ? "disabled" : ""}`}
                    onClick={() => selectedYear < currentYear && setSelectedYear(selectedYear + 1)}
                >
                    {selectedYear + 1}
                </span>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{"To see the data of your consumption, please log in to the portal first."}</p>
            ) : combinedData.length > 0 ? (
                <ResponsiveContainer width="90%" height={400}>
                    <BarChart data={combinedData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis label={{ value: "kWh", angle: -90, position: "insideLeft" }} />
                        <Tooltip  content={<CombinedTooltip />}/>
                        <Bar dataKey="amount" fill="#8884d8" barSize={50} />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <p>No consumption data available for {selectedYear}.</p>
            )}
        </div>
    );
};
const CombinedTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const totalCost = (payload[0].value * payload[0].payload.centsPerKwhWithVat) / 100;
        return (
            <div className="custom-tooltip">
                <p className="intro">{`${payload[0].value} kWh`}</p>
                <p className="label">{`${totalCost.toFixed(2)} €`}</p>
            </div>
        );
    }
    return null;
};

export default Consumption;
