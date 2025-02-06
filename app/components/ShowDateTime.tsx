import { useCallback, useEffect, useState } from "react";
import { Duration, Moment } from "moment";
import moment from "moment";
import { useMemo } from "react";
import { useCityInfoContext } from "../Context/Context";

const prayersInfo = [
  { key: "Fajr", displayName: "الفجر" },
  { key: "Dhuhr", displayName: "الظهر" },
  { key: "Asr", displayName: "العصر" },
  { key: "Maghrib", displayName: "المغرب" },
  { key: "Isha", displayName: "العشاء" },
];
const ShowDateTime = () => {
  const { cityInfo } = useCityInfoContext();

  const [today, setToday] = useState<string>("");
  const [nextPrayer, setNextPrayer] = useState<string>("الفجر");
  const [reminerToNextPrayer, setReminderToNextPrayer] =
    useState<string>("00:00:00");

  const timings = useMemo(
    () => ({
      Fajr: cityInfo?.prayersTime?.fajr,
      Dhuhr: cityInfo?.prayersTime?.dhuhr,
      Asr: cityInfo?.prayersTime?.asr,
      Maghrib: cityInfo?.prayersTime?.maghrib,
      Isha: cityInfo?.prayersTime?.isha,
    }),
    [cityInfo]
  );

  const setupNexPrayer = useCallback(() => {
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
  }, [timings]);

  useEffect(() => {
    const interval = setInterval(() => {
      setupNexPrayer();
      moment.locale("ar-sa");
      setToday(moment().format("dddd, MM/YY | h:mm a"));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timings, setupNexPrayer]);

  return (
    <div className="flex justify-around md:justify-evenly items-center text-center">
      <div className="">
        <h2 className="my-3">{today}</h2>
        <h1 className="text-3xl">{cityInfo.selectedCity.displayName}</h1>
      </div>
      <div className="my-7">
        <h2 className="my-3">{`متبقي حتى صلاة ${nextPrayer}`}</h2>
        <h1 className="text-3xl">{reminerToNextPrayer}</h1>
      </div>
    </div>
  );
};

export default ShowDateTime;
