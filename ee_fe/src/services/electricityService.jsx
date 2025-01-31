import axios from "axios";

export const fetchElectricityData = async (year) => {
    try {
        const startDateTime = `${year - 1}-12-31T22:00:00.000Z`;
        const endDateTime = `${year}-12-31T21:59:59.999Z`;

        const response = await axios.get("/api/electricity", {
            params: {
                startDateTime,
                endDateTime,
                resolution: "one_month",
            },
        });

        return response.data.map((entry) => ({
            date: new Date(entry.fromDateTime).toLocaleDateString("en-GB", { month: "short" }), // Extracts only the month name
            centsPerKwh: parseFloat(entry.centsPerKwh.toFixed(3)), // Round to 3 decimal places
            centsPerKwhWithVat: parseFloat(entry.centsPerKwhWithVat.toFixed(3)), // Round to 3 decimal places
            eurPerMwh: entry.eurPerMwh,
            eurPerMwhWithVat: entry.eurPerMwhWithVat,
        }));
    } catch (error) {
        console.error("Error fetching electricity data:", error);
        return [];
    }
};
