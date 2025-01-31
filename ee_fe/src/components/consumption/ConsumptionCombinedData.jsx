import { useEffect, useState } from "react";
import { fetchAllConsumption } from "../../services/ConsumptionService";
import { fetchElectricityData } from "../../services/ElectricityService";

const useConsumptionCombinedData = (selectedYear) => {
    const [combinedData, setCombinedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("Unauthorized. Please log in.");

                const electricityData = await fetchElectricityData(selectedYear);
                const consumptionData = await fetchAllConsumption(token);

                const aggregatedConsumption = combineData(consumptionData, selectedYear);
                const mergedData = mergeData(aggregatedConsumption, electricityData);

                setCombinedData(mergedData);
            } catch (err) {
                setError("Error fetching combined data: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedYear]);

    const combineData = (consumptionData, selectedYear) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const allMonthsData = months.map((month) => ({
            date: month,
            amount: 0,
            centsPerKwhWithVat: 0,
        }));

        consumptionData
            .filter(entry => new Date(entry.consumption_time).getFullYear() === selectedYear)
            .forEach((entry) => {
                const month = new Date(entry.consumption_time).toLocaleString("en-GB", { month: "short" });
                const existingEntry = allMonthsData.find((item) => item.date === month);

                if (existingEntry) {
                    existingEntry.amount += entry.amount;
                }
            });

        return allMonthsData;
    };


    const mergeData = (aggregatedConsumption, electricityData) => {
        return aggregatedConsumption.map(consumption => {
            const electricity = electricityData.find(entry => entry.date === consumption.date);

            return {
                ...consumption,
                centsPerKwhWithVat: electricity ? electricity.centsPerKwhWithVat : 0,
            };
        });
    };

    return { combinedData, loading, error };
};

export default useConsumptionCombinedData;
