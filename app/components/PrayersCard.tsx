import moment from "moment";
import { useCityInfoContext } from "../Context/Context";

const PrayerCard = () => {
  const { cityInfo } = useCityInfoContext();

  return (
    <div>
      <ul className="flex flex-col gap-4 max-w-2xl mx-auto">
        <li className="flex justify-between border-y-2 py-3 px-5 text-xl md:text-3xl font-bold rounded-md bg-gradient-to-br from-slate-700 via-slate-900 to-slate-700">
          الفجر:{" "}
          <span>
            {moment(cityInfo.prayersTime.fajr, "h:mm")
              .format("h:mm a")
              .toLocaleUpperCase()}
          </span>
        </li>
        <li className="flex justify-between border-y-2 py-3 px-5 text-xl md:text-3xl font-bold rounded-md bg-gradient-to-br from-slate-700 via-slate-900 to-slate-700">
          الظهر:{" "}
          <span>
            {moment(cityInfo.prayersTime.dhuhr, "h:mm")
              .format("h:mm a")
              .toLocaleUpperCase()}
          </span>
        </li>
        <li className="flex justify-between border-y-2 py-3 px-5 text-xl md:text-3xl font-bold rounded-md bg-gradient-to-br from-slate-700 via-slate-900 to-slate-700">
          العصر:{" "}
          <span>
            {moment(cityInfo.prayersTime.asr, "h:mm")
              .format("h:mm a")
              .toLocaleUpperCase()}
          </span>
        </li>
        <li className="flex justify-between border-y-2 py-3 px-5 text-xl md:text-3xl font-bold rounded-md bg-gradient-to-br from-slate-700 via-slate-900 to-slate-700">
          المغرب:{" "}
          <span>
            {moment(cityInfo.prayersTime.maghrib, "h:mm")
              .format("h:mm a")
              .toLocaleUpperCase()}
          </span>
        </li>
        <li className="flex justify-between border-y-2 py-3 px-5 text-xl md:text-3xl font-bold rounded-md bg-gradient-to-br from-slate-700 via-slate-900 to-slate-700">
          العشاء:{" "}
          <span>
            {moment(cityInfo.prayersTime.isha, "h:mm")
              .format("h:mm a")
              .toLocaleUpperCase()}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default PrayerCard;
