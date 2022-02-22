import "./menu.scss";
import MenuItem from "../menuItem/MenuItem";
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";

export default function Menu({
  favorites,
  setFavorites,
  allTags,
  selectedTags,
  setSelectedTags,
  lang,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(0);
  const [option_how_it_works_title, setOption_how_it_works_title] =
    useState("");
  const [option_how_it_works_text, setOption_how_it_works_text] = useState("");
  const [option_read_by_tag_title, setOption_read_by_tag_title] = useState("");
  const [option_read_by_tag_text, setOption_read_by_tag_text] = useState("");
  const [option_my_favorite_title, setOption_my_favorite_title] = useState("");
  const [option_my_favorite_text_1, setOption_my_favorite_text_1] =
    useState("");

  const [option_my_favorite_text_2, setOption_my_favorite_text_2] =
    useState("");
  const [option_create_title, setOption_create_title] = useState("");
  const [option_create_text_1, setOption_create_text_1] = useState("");
  const [option_create_text_2, setOption_create_text_2] = useState("");
  const fetch = useFetch();
  let menuArray = [
    {
      id: 1,
      title: option_how_it_works_title,
      text1: option_how_it_works_text,
      text2: "",
    },
    {
      id: 2,
      title: option_read_by_tag_title,
      text1: option_read_by_tag_text,
      text2: "",
    },
    {
      id: 3,
      title: option_my_favorite_title,
      text1: option_my_favorite_text_1,
      text2: option_my_favorite_text_2,
    },
    {
      id: 4,
      title: option_create_title,
      text1: option_create_text_1,
      text2: option_my_favorite_text_2,
    },
  ];

  useEffect(() => {
    const getOptions = async (key) => {
      try {
        setLoading(true);
        const howitworks_title = await fetch(
          PF + "/api/options/getByKey?lang=" + lang + "&key=02_how_it_works"
        ).then((r) => r.json());
        const howitworks_text = await fetch(
          PF + "/api/options/getByKey?lang=" + lang + "&key=04_more_about"
        ).then((r) => r.json());
        const read_title = await fetch(
          PF + "/api/options/getByKey?lang=" + lang + "&key=02_read_by_tag"
        ).then((r) => r.json());
        const read_text = await fetch(
          PF + "/api/options/getByKey?lang=" + lang + "&key=02_type_a_tag"
        ).then((r) => r.json());
        const fav_title = await fetch(
          PF + "/api/options/getByKey?lang=" + lang + "&key=02_my_favorite_tags"
        ).then((r) => r.json());
        const fav_text_1 = await fetch(
          PF +
            "/api/options/getByKey?lang=" +
            lang +
            "&key=02_remember_my_favorite"
        ).then((r) => r.json());
        const fav_text_2 = await fetch(
          PF +
            "/api/options/getByKey?lang=" +
            lang +
            "&key=02_your_favorite_tags"
        ).then((r) => r.json());
        const create_title = await fetch(
          PF + "/api/options/getByKey?lang=" + lang + "&key=02_create"
        ).then((r) => r.json());
        const create_text_1 = await fetch(
          PF + "/api/options/getByKey?lang=" + lang + "&key=02_create_account"
        ).then((r) => r.json());
        const create_text_2 = await fetch(
          PF + "/api/options/getByKey?lang=" + lang + "&key=02_subscribe"
        ).then((r) => r.json());

        setOption_how_it_works_title(howitworks_title.data.value);
        setOption_how_it_works_text(howitworks_text.data.value);
        setOption_read_by_tag_title(read_title.data.value);
        setOption_read_by_tag_text(read_text.data.value);
        setOption_my_favorite_title(fav_title.data.value);
        setOption_my_favorite_text_1(fav_text_1.data.value);
        setOption_my_favorite_text_2(fav_text_2.data.value);
        setOption_create_title(create_title.data.value);
        setOption_create_text_1(create_text_1.data.value);
        setOption_create_text_2(create_text_2.data.value);
        setLoading(false);
      } catch (e) {
        if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
          console.error(e);
        }
      }
    };

    if (lang.length !== 0) {
      getOptions();
    }
  }, [lang]);

  return (
    <ul className={"menu-1  " + (!loading && " not-transparent")}>
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
          title={p.title}
          setSelectedTags={setSelectedTags}
          text1={p.text1}
          text2={p.text2}
        />
      ))}
    </ul>
  );
}
