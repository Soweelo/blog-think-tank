import "./bepart.scss";
import BackHomeButton from "../backHomeButton/BackHomeButton";
import { memo } from "react";

import GetOption from "../getoption/GetOption";

import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

export default memo(function BePart({ lang, setHomeContent }) {
  return (
    <div id="bepart">
      <BackHomeButton setHomeContent={setHomeContent} />
      <h1>
        <QueryClientProvider client={queryClient}>
          <GetOption lang={lang} optionKey="05_join_the_project" />
        </QueryClientProvider>
      </h1>
      <div className="bepart__para-container">
        <QueryClientProvider client={queryClient}>
          <GetOption
            lang={lang}
            optionKey="04_join_the_project"
            toHtml={true}
            setLoading={true}
          />
        </QueryClientProvider>
      </div>
    </div>
  );
});
