import { useEffect, useState } from "react";
import "./styles.css";
import Header from "./components/header/header";
import Search from "./components/header/search/search";
import Content from "./components/content/content";

import getFetchData from "./utils/fetchData";
import { api_url, api_key, api_resources, limits } from "./utils/constants";

const url = `${api_url}${api_resources.trending}?api_key=${api_key}&limit=${limits.lim_12}&rating=g`;

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    getFetchData(url)
      .then((data) => setGifs(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <div className="mainContainer">
        <Header darkMode={darkMode} onThemeChange={setDarkMode} />
        <Search darkMode={darkMode} setGifs={setGifs} />
        <Content darkMode={darkMode} list={gifs} />
      </div>
    </div>
  );
}
