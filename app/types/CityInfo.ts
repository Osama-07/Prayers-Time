export interface CityInfoProps {
  selectedCity: {
    apiName: string;
    displayName: string;
  };
  prayersTime: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
}
