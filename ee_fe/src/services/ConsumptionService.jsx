import axios from "axios";

export const fetchAllConsumption = async (token) => {
    try {

    const response = await axios.get("/api/consumption", {
        headers: { Authorization: `Bearer ${token}` },
    });
    const mappedData = response.data.map(item => ({
        amount: item.amount,
        consumption_time: item.consumption_time,
    }));

    return mappedData;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};