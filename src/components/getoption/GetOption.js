import { QueryClient, useQuery } from "react-query";

import Loader from "../loader/Loader";
import "./getoption.scss";

function GetOption({
  lang = "en",
  optionKey,
  toHtml = true,
  setLoading = false,
  setOption,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { isLoading, error, data, isFetching } = useQuery(
    [lang, optionKey],
    async () =>
      await fetch(
        PF +
          "/api/options/getByKey?lang=" +
          (lang ? lang : "en") +
          "&key=" +
          optionKey
      ).then((r) => r.json())
  );
  if (isLoading) {
    if (setLoading) {
      return (
        <div className="getoption__loader">{<Loader loading={true} />}</div>
      );
    }
    return null;
  }
  if (error) return console.log(error.message); //debug mode
  // if (error) return null; //prod mode
  if (data.success) {
    if (toHtml) {
      return <div dangerouslySetInnerHTML={{ __html: data.data.value }}></div>;
    } else {
      return <div>{data.data.value}</div>;
    }
  }
  return null;
}
export default GetOption;
