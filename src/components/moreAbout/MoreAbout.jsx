import "./moreabout.scss";
import BackHomeButton from "../backHomeButton/BackHomeButton";
import { memo } from "react";

import GetOption from "../getoption/GetOption";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
export default memo(function MoreAbout({ lang, setHomeContent }) {
  return (
    <div id="moreabout">
      <BackHomeButton setHomeContent={setHomeContent} />
      <h1>
        <QueryClientProvider client={queryClient}>
          <GetOption lang={lang} optionKey="05_more_about" setLoading={true} />{" "}
        </QueryClientProvider>
      </h1>
      <div className="moreabout__para-container">
        <QueryClientProvider client={queryClient}>
          <GetOption lang={lang} optionKey="04_more_about" toHtml={true} />
        </QueryClientProvider>
      </div>
    </div>
  );
});
