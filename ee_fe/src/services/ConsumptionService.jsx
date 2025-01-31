import axios from "axios";

const fetchAllConsumption = async (token) => {
    const response = await axios.get("/api/consumption", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export default { fetchAllConsumption };
