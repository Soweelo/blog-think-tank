import { QueryClient, useQuery } from "react-query";

import Loader from "../loader/Loader";
import "./getoption.scss";

const GetOption = ({
  lang,
  optionKey,
  toHtml = false,

  setLoading = false,
}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { isLoading, error, data, isFetching } = useQuery(
    [lang, optionKey],
    () =>
      fetch(
        PF + "/api/options/getByKey?lang=" + lang + "&key=" + optionKey
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
  if (error)
    return <div>"An error has occurred: " {console.log(error.message)}</div>;
  if (data.success) {
    if (toHtml) {
      return <div dangerouslySetInnerHTML={{ __html: data.data.value }}></div>;
    } else {
      return <div>{data.data.value}</div>;
    }
  }
  return null;
};
export default GetOption;
