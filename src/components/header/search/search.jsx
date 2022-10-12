import "./search.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  api_url,
  api_key,
  api_resources,
  limits
} from "../../../utils/constants";
import getFetchData from "../../../utils/fetchData";

const urlSearch = `${api_url}${api_resources.search}?api_key=${api_key}`;

export default function Search({
  setGifs,
  darkMode,
  setLoading,
  setShow,
  loading,
  show
}) {
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
    setSuggestions(matches);
    setStringSearch(text);
  };

  const handleInput = (e) => {
    e.preventDefault();
    const searchUrl = `${urlSearch}=${stringSearch}&limit=${limits.lim_12}&rating=g`;

    getFetchData(searchUrl)
      .then((data) => setGifs(data))
      .catch((err) => console.log(err));

    setStringSearch("");

    setLoading(!loading);
    setTimeout(() => {
      setLoading(loading);
    }, 2000);

    setShow(true);
  };
  const clearInput = () => {
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
      <div className="searchContainer">
        <div className="searchInputs">
          <input
            className="inputContainer"
            type="text"
            onChange={(e) => onChangeHandler(e.target.value)}
            onKeyDown={(e) => onChangeHandler(e.target.value)}
            placeholder="Realiza tu búsqueda"
            value={stringSearch}
            onBlur={() => {
              setTimeout(() => {
                setSuggestions([]);
              }, 100);
            }}
          />
          <div className="searchIcon">
            {suggestions.length === 0 ? (
              <FontAwesomeIcon
                id="clearBtn"
                icon={faSearch}
                onClick={handleInput}
                onKeyDown={(e) => {
                  if (e.code === "Enter") handleInput();
                }}
              />
            ) : (
              <FontAwesomeIcon
                id="clearBtn"
                icon={faTimes}
                onClick={clearInput}
              />
            )}
          </div>
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
