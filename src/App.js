import { useEffect, useState } from "react";
import "./styles.css";
import Header from "./components/header/header";
import Search from "./components/header/search/search";
import Content from "./components/content/content";

import getFetchData from "./utils/fetchData";
import { api_url, api_key, api_resources, limits } from "./utils/constants";

const url = `${api_url}${api_resources.trending}?api_key=${api_key}&limit=${limits.lim_12}&rating=g`;

export default function App() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    getFetchData(url)
      .then((data) => setGifs(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [loading]);

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <div className="mainContainer">
        <Header darkMode={darkMode} onThemeChange={setDarkMode} />
        <Search
          darkMode={darkMode}
          setGifs={setGifs}
          show={show}
          setShow={setShow}
          loading={loading}
          setLoading={setLoading}
        />
        <Content
          list={gifs}
          darkMode={darkMode}
          show={show}
          loading={loading}
        />
      </div>
    </div>
  );
}
