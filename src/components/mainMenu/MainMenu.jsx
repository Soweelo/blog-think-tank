import "./mainmenu.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Favorite, Person, Search } from "@material-ui/icons";
import { QueryClient, QueryClientProvider } from "react-query";
import GetOption from "../getoption/GetOption";
const queryClient = new QueryClient();
export default function MainMenu({
  mainMenuOpen,
  setMainMenuOpen,
  homeContent,
  setHomeContent,
  lang,
}) {
  const changeContent = (e) => {
    setHomeContent(e.target.id);
    // console.log(e.target);
    setMainMenuOpen(false);
  };
  return (
    <div className={"menu " + (mainMenuOpen && "active")}>
      <div className="menu__icon-wrapper">
        <div className="menu__icon">
          <Favorite />
        </div>
        <div className="menu__icon">
          <Search />
        </div>
        <div className="menu__icon">
          <Person />
        </div>
      </div>
      <ul>
        <li>
          <div onClick={(e) => changeContent(e)} id="1">
            <QueryClientProvider client={queryClient}>
              <GetOption lang={lang} optionKey="05_more_about" />{" "}
            </QueryClientProvider>
          </div>
        </li>
        <li>
          <div onClick={(e) => changeContent(e)} id="2">
            <QueryClientProvider client={queryClient}>
              <GetOption lang={lang} optionKey="05_privacy" />{" "}
            </QueryClientProvider>
          </div>
        </li>
        <li>
          <div onClick={(e) => changeContent(e)} id="3">
            <QueryClientProvider client={queryClient}>
              <GetOption lang={lang} optionKey="05_faq" />{" "}
            </QueryClientProvider>
          </div>
        </li>
        <li>
          <div onClick={(e) => changeContent(e)} id="4">
            <QueryClientProvider client={queryClient}>
              <GetOption lang={lang} optionKey="05_join_the_project" />{" "}
            </QueryClientProvider>
          </div>
        </li>
      </ul>
    </div>
  );
}
