import { useQuery } from "react-query";
import axios from "axios";

const getOptions = async (lang) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { data } = await axios.get(PF + "/api/options?lang=" + lang);
  // const { data } = await axios.get(PF + "/api/options?lang=" + (lang ? lang : "en")).then((r) => r.json())

  return data;
};

export default function useOptions({ lang, setOptions }) {
  return useQuery([lang, setOptions], getOptions(lang, setOptions));
}
