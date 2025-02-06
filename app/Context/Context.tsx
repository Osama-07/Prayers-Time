"use client";
import { ReactNode, useContext, useState } from "react";
import { CityInfoProps } from "../types/CityInfo";
import CityInfoContext from "./CityInfoContext";

const Context = ({ children }: { children: ReactNode }) => {
  const [cityInfo, setCityInfo] = useState<CityInfoProps>({
    selectedCity: {
      apiName: "Taif",
      displayName: "الطائف",
    },
    prayersTime: {
      fajr: "5:00 AM",
      dhuhr: "12:00 PM",
      asr: "4:00 PM",
      maghrib: "6:00 PM",
      isha: "8:00 PM",
    },
  });

  const values = { cityInfo, setCityInfo };

  return (
    <CityInfoContext.Provider value={values}>
      {children}
    </CityInfoContext.Provider>
  );
};

export const useCityInfoContext = () => {
  const context = useContext(CityInfoContext);
  if (!context) {
    throw new Error(
      "useCityInfoContext must be used within a CityInfoProvider"
    );
  }
  return context;
};

export default Context;
