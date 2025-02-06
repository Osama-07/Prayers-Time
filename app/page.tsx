"use client";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect } from "react";
import ShowDateTime from "./components/ShowDateTime";
import PrayersCard from "./components/PrayersCard";
import { CityInfoProps } from "./types/CityInfo";
import { useCityInfoContext } from "./Context/Context";
import axios from "axios";
import "./globals.css";

const availableCities = [
  // الرياض
  { displayName: "الرياض", apiName: "Riyadh" },
  { displayName: "الخرج", apiName: "AlKharj" },
  { displayName: "الدرعية", apiName: "AdDiriyah" },
  { displayName: "وادي الدواسر", apiName: "WadiAdDawasir" },
  { displayName: "الدوادمي", apiName: "AdDawadmi" },
  { displayName: "شقراء", apiName: "Shaqra" },
  { displayName: "المجمعة", apiName: "AlMajmaah" },

  // مكة المكرمة
  { displayName: "مكة المكرمة", apiName: "Mecca" },
  { displayName: "جدة", apiName: "Jeddah" },
  { displayName: "الطائف", apiName: "Taif" },
  { displayName: "رابغ", apiName: "Rabigh" },
  { displayName: "خليص", apiName: "Khulais" },

  // المدينة المنورة
  { displayName: "المدينة المنورة", apiName: "Medina" },
  { displayName: "ينبع", apiName: "Yanbu" },
  { displayName: "العلا", apiName: "AlUla" },
  { displayName: "خيبر", apiName: "Khaybar" },

  // المنطقة الشرقية
  { displayName: "الدمام", apiName: "Dammam" },
  { displayName: "الخبر", apiName: "Khobar" },
  { displayName: "الظهران", apiName: "Dhahran" },
  { displayName: "الأحساء", apiName: "AlAhsa" },
  { displayName: "حفر الباطن", apiName: "HafarAlBatin" },
  { displayName: "الخفجي", apiName: "Khafji" },
  { displayName: "القطيف", apiName: "Qatif" },

  // عسير
  { displayName: "أبها", apiName: "Abha" },
  { displayName: "خميس مشيط", apiName: "KhamisMushait" },
  { displayName: "النماص", apiName: "AnNamas" },
  { displayName: "محايل", apiName: "Muhayil" },

  // جازان
  { displayName: "جازان", apiName: "Jazan" },
  { displayName: "صبيا", apiName: "Sabya" },
  { displayName: "أبو عريش", apiName: "AbuArish" },
  { displayName: "الدرب", apiName: "AdDarb" },

  // نجران
  { displayName: "نجران", apiName: "Najran" },
  { displayName: "شرورة", apiName: "Sharurah" },

  // الباحة
  { displayName: "الباحة", apiName: "AlBahah" },
  { displayName: "بلجرشي", apiName: "Baljurashi" },

  // تبوك
  { displayName: "تبوك", apiName: "Tabuk" },
  { displayName: "الوجه", apiName: "AlWajh" },
  { displayName: "أملج", apiName: "Umluj" },

  // القصيم
  { displayName: "بريدة", apiName: "Buraidah" },
  { displayName: "عنيزة", apiName: "Unaizah" },
  { displayName: "الرس", apiName: "ArRass" },

  // حائل
  { displayName: "حائل", apiName: "Hail" },
  { displayName: "بقعاء", apiName: "Baqaa" },

  // الحدود الشمالية
  { displayName: "عرعر", apiName: "Arar" },
  { displayName: "رفحاء", apiName: "Rafha" },
  { displayName: "طريف", apiName: "Turaif" },

  // الجوف
  { displayName: "سكاكا", apiName: "Sakaka" },
  { displayName: "القريات", apiName: "AlQurayyat" },
];
export default function Home() {
  const { cityInfo, setCityInfo } = useCityInfoContext();

  const getTimings = async (apiName: string) => {
    try {
      const res = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity?country=SA&city=${apiName}`
      );
      const timings = res.data.data.timings;
      if (timings) {
        setCityInfo((prev: CityInfoProps) => ({
          ...prev,
          prayersTime: {
            fajr: timings.Fajr,
            dhuhr: timings.Dhuhr,
            asr: timings.Asr,
            maghrib: timings.Maghrib,
            isha: timings.Isha,
          },
        }));
      }
    } catch (error) {
      console.error("Error fetching timings:", error);
    }
  };

  useEffect(() => {
    const cityObject = localStorage.getItem("city");

    if (cityObject) {
      const parsedCity = JSON.parse(cityObject);
      setCityInfo((prev: CityInfoProps) => ({
        ...prev,
        selectedCity: {
          apiName: parsedCity.apiName,
          displayName: parsedCity.displayName,
        },
      }));

      getTimings(parsedCity.apiName);
    }
  }, []);

  function handleCityChange(event: SelectChangeEvent) {
    const cityObject = availableCities.find(
      (city) => city.apiName === event.target.value
    );

    if (cityObject) {
      localStorage.setItem("city", JSON.stringify(cityObject));
      setCityInfo((prev: CityInfoProps) => ({
        ...prev,
        selectedCity: {
          apiName: cityObject.apiName,
          displayName: cityObject.displayName,
        },
      }));

      getTimings(cityObject.apiName);
    }
  }

  return (
    <div className="p-10 max-md:px-4 h-screen">
      <h1 className="text-5xl max-md:text-4xl font-bold text-center">
        مـواقــيت الـصـلاة
      </h1>
      <ShowDateTime />
      <FormControl
        style={{ display: "flex", margin: "30px auto" }}
        className="form-control bg-gradient-to-bl from-slate-700 via-slate-900 to-slate-700 w-1/6 max-md:w-1/3 rounded-lg"
      >
        <InputLabel
          id="demo-simple-select-label"
          className="!text-white text-lg"
        >
          المدينة
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cityInfo.selectedCity.apiName}
          label="City"
          className="!text-white"
          onChange={handleCityChange}
        >
          {availableCities.map((city, index) => (
            <MenuItem
              key={index}
              value={city.apiName}
              selected={cityInfo.selectedCity.displayName === city.displayName}
            >
              {city.displayName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <PrayersCard />
      <footer className="text-center py-5">
        <h1 className="text-xl font-bold">Made With &copy; Osama Abdulaziz</h1>
      </footer>
    </div>
  );
}
