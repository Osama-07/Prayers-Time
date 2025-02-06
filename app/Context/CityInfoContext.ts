import { createContext } from "react"; // استخدام react بدلاً من vm
import { CityInfoProps } from "../types/CityInfo";

interface ICityInfoContextType {
  cityInfo: CityInfoProps;
  setCityInfo: React.Dispatch<React.SetStateAction<CityInfoProps>>;
}

const CityInfoContext = createContext<ICityInfoContextType | null>(null);

export default CityInfoContext;
