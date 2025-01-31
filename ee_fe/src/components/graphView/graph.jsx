import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
    { name: "Tiit", value: 1 },
    { name: "Teet", value: 2 },
];

const UserGraph = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check for the token in localStorage (or wherever you're storing it)
        const token = localStorage.getItem("token");
        setIsLoggedIn(token !== null); // Update login status based on token presence
    }, []);

    return (
        <div className="w-full h-96 p-4 bg-white rounded-2xl shadow-lg flex flex-col items-center">
            <h2 className="text-xl font-bold text-center mb-4">User Data Graph</h2>

            {/* If logged in, show the graph, else show the login message */}
            {isLoggedIn ? (
                <BarChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" barSize={50} />
                </BarChart>
            ) : (
                <div className="text-center text-red-500 font-bold">
                    You need to be logged in to view this
                </div>
            )}
        </div>
    );
};

export default UserGraph;
