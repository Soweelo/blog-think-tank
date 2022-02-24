import "./privacy.scss";
import BackHomeButton from "../backHomeButton/BackHomeButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import GetOption from "../getoption/GetOption";
const queryClient = new QueryClient();
export default function Privacy({ lang, setHomeContent }) {
  return (
    <div id="privacy">
      <BackHomeButton setHomeContent={setHomeContent} />
      <h1>
        <QueryClientProvider client={queryClient}>
          <GetOption lang={lang} optionKey="05_privacy" />{" "}
        </QueryClientProvider>
      </h1>
      {/*<div dangerouslySetInnerHTML={{ __html: option_privacy_text }} className="privacy__para-container">*/}
      {/*    <p>*/}

      {/*    </p>*/}
      {/*</div>*/}
    </div>
  );
}
