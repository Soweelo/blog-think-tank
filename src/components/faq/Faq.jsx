import "./faq.scss";
import BackHomeButton from "../backHomeButton/BackHomeButton";

import { QueryClient, QueryClientProvider } from "react-query";
import GetOption from "../getoption/GetOption";
const queryClient = new QueryClient();
export default function Faq({ lang, setHomeContent }) {
  return (
    <div id="faq">
      <BackHomeButton setHomeContent={setHomeContent} />
      <h1>
        <QueryClientProvider client={queryClient}>
          <GetOption lang={lang} optionKey="05_faq" setLoading={true} />{" "}
        </QueryClientProvider>
      </h1>
      <div className="faq__para-container">
        <QueryClientProvider client={queryClient}>
          <GetOption lang={lang} optionKey="04_faq" toHtml={true} />
        </QueryClientProvider>
      </div>
    </div>
  );
}
