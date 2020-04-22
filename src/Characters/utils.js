import axios from "../AxiosInstance";
import { useState, useMemo } from "react";

export function getCharacters(id, quote) {
  let path = "";
  if (id) {
    path = `/character/${id}`;
    path += quote ? "/quote" : "";
  } else {
    path = "/character";
  }
  return axios.get(path);
  // return path;
}

export const noneCharacters = [];
export const noneQuotes = [];
export const emptyStr = "";

export function useCharactersInfo() {
  let [characters, setCharacters] = useState(noneCharacters);
  const [quotes, setQuotes] = useState(noneQuotes);
  const [show, setQuotesShow] = useState(null);
  let [searchStr, setSearchStr] = useState(emptyStr);
  const [gender, setGender] = useState(emptyStr);

  const selectGender = function(event) {
    const value = event.target.value;
    setGender(value);
  };
  // setSearchStr = debounce(setSearchStr);

  const handleSearchByName = function(event) {
    const value = event.target.value;
    setSearchStr(value);
  };

  const handleSetCharacters = function() {
    getCharacters()
      .then(res => {
        setCharacters(res.data.docs);
      })
      .catch(() => {
        setCharacters(noneCharacters);
      });
  };

  const handleSelectCharacter = function(character) {
    // getCharacters(character._id, true)
    let url = "/character/5cd99d4bde30eff6ebccfd0e/quote";
    axios
      .get(url)
      .then(res => {
        setQuotes(res.data.docs);
        setQuotesShow(character);
      })
      .catch(() => {
        setQuotes(noneQuotes);
        setQuotesShow(character);
      });
  };

  // filters by name characters
  characters = useMemo(
    function() {
      return characters.filter(character => {
        if (gender && !searchStr) {
          return character.gender === gender;
        } else if (searchStr && !gender) {
          return character.name.includes(searchStr);
        } else {
          return (
            character.gender === gender && character.name.includes(searchStr)
          );
        }
      });
    },
    [characters, searchStr, gender]
  );

  return [
    characters,
    handleSetCharacters,
    quotes,
    handleSelectCharacter,
    show,
    setQuotesShow,
    searchStr,
    handleSearchByName,
    gender,
    selectGender
  ];
}

let cancel = null;
const timeout = 2000;
export function debounce(fn) {
  return function(args) {
    // const refArgs = args;
    if (cancel) {
      clearTimeout(cancel);
    }
    cancel = setTimeout(() => {
      fn(args);
    }, timeout);
  };
}
