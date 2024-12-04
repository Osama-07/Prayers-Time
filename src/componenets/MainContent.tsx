import moment, { Duration, Moment } from "moment";
import { ReactElement, useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import PrayerCard from "./PrayerCard";
import Prayer from "../Types/PrayerType";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import axios from "axios";
import "../mainContent.css";
// import "../../node_modules/moment/locale/ar-dz.js";

moment.locale("ar", {
  postformat: function (string: string): string {
    return string.replace(/\d/g, (digit) => "0123456789"[parseInt(digit, 10)]);
  },
});
const prayers: Prayer[] = [
  {
    img: {
      src: "/imgs/Fajer.png",
      alt: "Fajr Prayer",
    },
    prayerName: "الفجر",
    time: "2024-11-28T05:00:00",
  },
  {
    img: {
      src: "/imgs/Douhr.png",
      alt: "Zuhr Prayer",
    },
    prayerName: "الظهر",
    time: "2024-11-28T12:00:00",
  },
  {
    img: {
      src: "/imgs/Asr.png",
      alt: "Asr Prayer",
    },
    prayerName: "العصر",
    time: "2024-11-28T15:30:00",
  },
  {
    img: {
      src: "/imgs/Maghreb.png",
      alt: "Maghrib Prayer",
    },
    prayerName: "المغرب",
    time: "2024-11-28T18:00:00",
  },
  {
    img: {
      src: "/imgs/Esha.png",
      alt: "Isha Prayer",
    },
    prayerName: "العشاء",
    time: "2024-11-28T19:30:00",
  },
];

function MainContent(): ReactElement {
  // Start Static Info
  const availableCities = [
    {
      displayName: "الطائف",
      apiName: "Taif",
    },
    {
      displayName: "مكة المكرمة",
      apiName: "Makkah",
    },
    {
      displayName: "جدة",
      apiName: "Jeddah",
    },
  ];
  const prayersInfo = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Maghrib", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];
  // End Static Info
  // Start STATES
  const [selectedCity, setSelectedCity] = useState({
    displayName: "الطائف",
    apiName: "Taif",
  });

  const [timings, setTimings] = useState({
    Fajr: "05:00",
    Dhuhr: "12:00",
    Asr: "16:00",
    Maghrib: "18:00",
    Isha: "19:00",
  });

  const [today, setToday] = useState("");

  const [nextPrayer, setNextPrayer] = useState("");

  const [reminderToNextPrayer, setReminderToNextPrayer] = useState("");

  // End STATES

  // Start Handle Evenets
  function handleChange(event: SelectChangeEvent) {
    const cityObject = availableCities.find(
      (city) => city.apiName === event.target.value
    );
    if (cityObject) {
      setSelectedCity(cityObject);
    }
  }
  // End Handle Evenets
  const getTimings = async () => {
    const res = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=SA&city=${selectedCity.apiName}`
    );
    setTimings(res.data.data.timings);
  };
  // Start Effects
  useEffect(() => {
    getTimings();
  }, [selectedCity]);

  useEffect(() => {
    const interval: number = setInterval(() => {
      setupNexPrayer();
      setToday(moment().format("Do  MMMM  YYYY | h:mm a"));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timings]);
  // End Effects
  function setupNexPrayer() {
    const momentNow: Moment = moment();
    let prayerIndex: number = 0;
    if (
      momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
    ) {
      prayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
    ) {
      prayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Maghrib"], "hh:mm"))
    ) {
      prayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timings["Maghrib"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
    ) {
      prayerIndex = 4;
    } else {
      prayerIndex = 0;
    }

    setNextPrayer(prayersInfo[prayerIndex].displayName);
    const key = prayersInfo[prayerIndex].key as keyof typeof timings;

    const nextPrayerTime: Moment = moment(timings[key], "hh:mm");
    if (key === "Fajr" && momentNow.isAfter(moment(timings["Isha"], "hh:mm"))) {
      nextPrayerTime.add(1, "day");
    }

    const timeDiff = nextPrayerTime.diff(momentNow);
    const duration: Duration = moment.duration(timeDiff);

    setReminderToNextPrayer(
      `${duration.hours().toString().padStart(2, "0")}:${duration
        .minutes()
        .toString()
        .padStart(2, "0")}:${duration.seconds().toString().padStart(2, "0")}`
    );
  }
  return (
    <>
      <div className="flex justify-around items-center text-center">
        <div className="my-5">
          <h2 className="">{today}</h2>
          <h1>{selectedCity.displayName}</h1>
        </div>
        <div className="my-5">
          <h2 className="">{`متبقي حتى صلاة ${nextPrayer}`}</h2>
          <h1>{reminderToNextPrayer}</h1>
        </div>
      </div>
      <Divider className="!border-white opacity-10" />
      <Stack
        direction={{
          xs: "column", // الاتجاه عمودي للشاشات الصغيرة جدًا
          sm: "column", // الاتجاه أفقي للشاشات الصغيرة
          md: "row", // الاتجاه أفقي للشاشات المتوسطة
          lg: "row", // الاتجاه أفقي للشاشات الكبيرة
          xl: "row", // الاتجاه أفقي للشاشات الكبيرة جدًا
        }}
        justifyContent={"center"}
        alignItems={"center"}
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        className="!text-center !m-5"
      >
        <PrayerCard
          img={prayers[0].img}
          prayerName={prayers[0].prayerName}
          time={timings.Fajr}
        />
        <PrayerCard
          img={prayers[1].img}
          prayerName={prayers[1].prayerName}
          time={timings.Dhuhr}
        />
        <PrayerCard
          img={prayers[2].img}
          prayerName={prayers[2].prayerName}
          time={timings.Asr}
        />
        <PrayerCard
          img={prayers[3].img}
          prayerName={prayers[3].prayerName}
          time={timings.Maghrib}
        />
        <PrayerCard
          img={prayers[4].img}
          prayerName={prayers[4].prayerName}
          time={timings.Isha}
        />
      </Stack>
      <Stack className="!m-5" direction={"row"} justifyContent={"center"}>
        <FormControl className="w-36">
          <InputLabel className="!text-white" id="city">
            City
          </InputLabel>
          <Select
            className="!text-white !border-white"
            labelId="city"
            id="select-city"
            value={selectedCity.apiName}
            label="City"
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white", // تغيير لون البوردر
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white", // لون البوردر عند التمرير
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white", // لون البوردر عند التركيز
              },
              ".MuiSvgIcon-root": {
                color: "white",
              },
            }}
          >
            {availableCities.map((city) => {
              return (
                <MenuItem key={city.displayName} value={city.apiName}>
                  {city.displayName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}

export default MainContent;
