import React, { useEffect } from "react";
import { useCharactersInfo } from "./utils";
import Modal from "../Modal";
import { charactersCategory } from "./constants";
import "./styles.css";

export default function Characters() {
  const [
    characters,
    handleSetCharacters,
    quotes,
    handleSelectCharacter,
    show,
    setQuotesShow,
    searchStr,
    handleSearchByName,
    charactersCategoryVal,
    selectCharactersCategory
  ] = useCharactersInfo();
  useEffect(handleSetCharacters, []);
  return (
    <div className="characters">
      <div className="characters__search">
        {/* <label></label> */}
        <input
          value={searchStr}
          onChange={handleSearchByName}
          placeholder={"Search By Name"}
        />
        <div className="spacer"></div>
        <select
          value={charactersCategoryVal}
          onChange={selectCharactersCategory}
        >
          <option value={""}>Characters Category</option>
          {charactersCategory.map(function(category, i) {
            return (
              <option key={"key" + i} value={category}>
                {category}
              </option>
            );
          })}
        </select>
      </div>
      <div className="characters__list">
        {characters.map(function(character) {
          return (
            // <div>
            <Charactercard
              key={character._id}
              character={character}
              handleSelectCharacter={handleSelectCharacter}
            />
            // </div>
          );
        })}
      </div>
      <Modal show={Boolean(show)}>
        <div className="character-quotes">
          <div
            className="character-quotes__close"
            onClick={() => setQuotesShow(null)}
          >
            X
          </div>
          <div className="character-quotes__title">
            {show && show.name + " Says "}
          </div>
          <div className="character-quotes__content">
            {quotes.length ? (
              quotes.map(function(quote, i) {
                return (
                  <div key={i} className="quotes">
                    {quote.dialog}
                  </div>
                );
              })
            ) : (
              <div className="character-quotes__content__none">
                {" "}
                No Quotes Available
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

function Charactercard({ character, handleSelectCharacter }) {
  return (
    <div
      className="characters-card"
      onClick={() => {
        handleSelectCharacter(character);
      }}
    >
      <div>
        <span className="label">name</span>
        {character.name}
      </div>
      <div>
        <span className="label">race</span>
        {character.race}
      </div>
      <div>
        <span className="label">realm</span>
        {character.realm}
      </div>
      <div>
        <span className="label">birth</span>
        {character.birth}
      </div>
      <div>
        <span className="label">gender</span>
        {character.gender}
      </div>
      <div className="anchor">
        {/* <span className="label">gender</span> */}
        <a href={character.wikiUrl}>{"Visit character wiki"}</a>
      </div>
    </div>
  );
}
