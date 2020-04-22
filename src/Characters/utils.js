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
  const [characters, setCharacters] = useState(noneCharacters);
  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState(noneQuotes);
  const [show, setQuotesShow] = useState(null);
  let [searchStr, setSearchStr] = useState(emptyStr);
  const [charactersCategoryVal, seCharactersCategoryVal] = useState(emptyStr);

  const selectCharactersCategory = function(event) {
    const value = event.target.value;
    seCharactersCategoryVal(value);
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
        setLoading(false);
      })
      .catch(() => {
        setCharacters(noneCharacters);
        setLoading(false);
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
  const charactersfiltered = useMemo(
    function() {
      return characters.filter(character => {
        if (charactersCategoryVal && !searchStr) {
          return character.race === charactersCategoryVal;
        } else if (searchStr && !charactersCategoryVal) {
          return character.name.includes(searchStr);
        } else if (searchStr && charactersCategoryVal) {
          return (
            character.race === charactersCategoryVal &&
            character.name.includes(searchStr)
          );
        } else {
          return character;
        }
      });
    },
    [characters, searchStr, charactersCategoryVal]
  );

  return [
    charactersfiltered,
    loading,
    handleSetCharacters,
    quotes,
    handleSelectCharacter,
    show,
    setQuotesShow,
    searchStr,
    handleSearchByName,
    charactersCategoryVal,
    selectCharactersCategory
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
