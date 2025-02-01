import useConsumptionCombinedData from '../ConsumptionCombinedData.jsx';

describe('combineData', () => {
    it('should aggregate the consumption data by month for the selected year', () => {
        const consumptionData = [
            { consumption_time: '2023-01-15T12:00:00Z', amount: 50 },
            { consumption_time: '2023-01-25T12:00:00Z', amount: 30 },
            { consumption_time: '2023-03-10T12:00:00Z', amount: 40 },
        ];

        const selectedYear = 2023;

        const result = combineData(consumptionData, selectedYear);

        expect(result).toEqual([
            { date: 'Jan', amount: 80, centsPerKwhWithVat: 0 },
            { date: 'Feb', amount: 0, centsPerKwhWithVat: 0 },
            { date: 'Mar', amount: 40, centsPerKwhWithVat: 0 },
            { date: 'Apr', amount: 0, centsPerKwhWithVat: 0 },
            { date: 'May', amount: 0, centsPerKwhWithVat: 0 },
            { date: 'Jun', amount: 0, centsPerKwhWithVat: 0 },
            { date: 'Jul', amount: 0, centsPerKwhWithVat: 0 },
            { date: 'Aug', amount: 0, centsPerKwhWithVat: 0 },
            { date: 'Sep', amount: 0, centsPerKwhWithVat: 0 },
            { date: 'Oct', amount: 0, centsPerKwhWithVat: 0 },
            { date: 'Nov', amount: 0, centsPerKwhWithVat: 0 },
            { date: 'Dec', amount: 0, centsPerKwhWithVat: 0 },
        ]);
    });

    it('should not include consumption data for a different year', () => {
        const consumptionData = [
            { consumption_time: '2022-01-15T12:00:00Z', amount: 50 },
        ];

        const selectedYear = 2023;

        const result = combineData(consumptionData, selectedYear);

        expect(result).toEqual([
            { date: 'Jan', amount: 0, centsPerKwhWithVat: 0 },
            { date: 'Feb', amount: 0, centsPerKwhWithVat: 0 },
            { date: 'Mar', amount: 0, centsPerKwhWithVat: 0 },
            { date: 'Apr', amount: 0, centsPerKwhWithVat: 0 },
            { date: 'May', amount: 0, centsPerKwhWithVat: 0 },
            { date: 'Jun', amount: 0, centsPerKwhWithVat: 0 },
            { date: 'Jul', amount: 0, centsPerKwhWithVat: 0 },
            { date: 'Aug', amount: 0, centsPerKwhWithVat: 0 },
            { date: 'Sep', amount: 0, centsPerKwhWithVat: 0 },
            { date: 'Oct', amount: 0, centsPerKwhWithVat: 0 },
            { date: 'Nov', amount: 0, centsPerKwhWithVat: 0 },
            { date: 'Dec', amount: 0, centsPerKwhWithVat: 0 },
        ]);
    });
});
