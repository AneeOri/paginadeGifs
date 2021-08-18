import "./search.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  api_url,
  api_key,
  api_resources,
  limits
} from "../../../utils/constants";
import getFetchData from "../../../utils/fetchData";

const urlSearch = `${api_url}${api_resources.search}?api_key=${api_key}`;

export default function Search({ setGifs, darkMode }) {
  const [stringSearch, setStringSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get(
        `${api_url}${api_resources.tags}?api_key=${api_key}=${stringSearch}&limit=${limits.lim_12}&rating=g`
      );
      setUsers(response.data.data);
    };
    loadUsers();
  }, [stringSearch]);

  const onSuggestionHandler = (text) => {
    setStringSearch(text);
    setSuggestions([]);
  };
  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = users.filter((users) => {
        const regex = new RegExp(`${text}`, "gi");
        return users.name.match(regex);
      });
    }
    console.log(matches);
    setSuggestions(matches);
    setStringSearch(text);
  };

  const handleInput = (e) => {
    e.preventDefault();
    const searchUrl = `${urlSearch}=${stringSearch}&limit=${limits.lim_12}&rating=g`;

    getFetchData(searchUrl)
      .then((data) => setGifs(data))
      .catch((err) => console.log(err));

    console.log("urlDeBusqueda", searchUrl);
    setStringSearch("");
  };

  return (
    <div className="searchContainer">
      <p className={`fraseInicio ${darkMode} ? "dark" : "light"`}>
        {" "}
        ¡Inspirate con los mejores Gifos!{" "}
      </p>
      <img
        className="imageSearch"
        src="./resources/ilustra_header.svg"
        alt="personas saludando"
      />
      <div>
        <div>
          <input
            className="inputContainer"
            type="text"
            onChange={(e) => onChangeHandler(e.target.value)}
            value={stringSearch}
          />
          <button className="searchButton" type="button" onClick={handleInput}>
            <img src="./resources/icon-search.svg" alt="lupa de busqueda" />
          </button>
        </div>
        {suggestions &&
          suggestions.map((suggestion, i) => (
            <div
              className="divSugg"
              key={i}
              onClick={() => onSuggestionHandler(suggestion.name)}
            >
              {suggestion.name}
            </div>
          ))}
      </div>
    </div>
  );
}
