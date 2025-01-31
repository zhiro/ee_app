import React, { createContext, useContext, useState } from "react";

const ElectricityContext = createContext();

export const ElectricityProvider = ({ children }) => {
  const [electricityData, setElectricityData] = useState(null);

  return (
    <ElectricityContext.Provider value={{ electricityData, setElectricityData }}>
      {children}
    </ElectricityContext.Provider>
  );
};

export const useElectricity = () => useContext(ElectricityContext);
