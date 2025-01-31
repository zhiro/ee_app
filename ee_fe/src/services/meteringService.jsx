import axios from "axios";

const API_BASE_URL = "/api/metering";

const MeteringService = {
    fetchMeteringPoints: async (token) => {
        const response = await axios.get(`${API_BASE_URL}-points`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    },

    fetchConsumptionData: async (meteringPointId, token) => {
        const response = await axios.get(`${API_BASE_URL}-points/${meteringPointId}/consumptions`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    },
};

export default MeteringService;
