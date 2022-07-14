import "./menu.scss";
import MenuItem from "../menuItem/MenuItem";
import { useState } from "react";

export default function Menu({
  favorites,
  setFavorites,
  allTags,
  selectedTags,
  setSelectedTags,
  setHomeContent,
  allOptions,
  setShowAuth,
  setRegisterContent,
}) {
  const [menuOpen, setMenuOpen] = useState(0);

  let menuArray = [
    {
      id: 1,
    },
    // {
    //   id: 2,
    // },
    {
      id: 3,
    },
    // {
    //   id: 4,
    // },
  ];

  return (
    <ul className={"menu-1  not-transparent"}>
      {menuArray.map((p) => (
        <MenuItem
          key={p.id}
          id={p.id}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          favorites={favorites}
          setFavorites={setFavorites}
          allTags={allTags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          allOptions={allOptions}
          setHomeContent={setHomeContent}
          setShowAuth={setShowAuth}
          setRegisterContent={setRegisterContent}
        />
      ))}
    </ul>
  );
}
