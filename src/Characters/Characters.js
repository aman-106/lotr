import React, { useEffect } from "react";
import { useCharactersInfo } from "./utils";
import Modal from "../Modal";
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
    gender,
    selectGender
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
        <select value={gender} onChange={selectGender}>
          <option value={""}>None</option>
          <option value={"Female"}>female</option>
          <option value={"Male"}>male</option>
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
      <Modal show={show}>
        <div className="character-quotes">
          <div
            className="character-quotes__close"
            onClick={() => setQuotesShow(null)}
          >
            X
          </div>
          <div className="character-quotes__title">{show && show.name}</div>
          <div className="character-quotes__content">
            {quotes.length ? (
              quotes.map(function(quote) {
                return <div className="quotes">{quote.dialog}</div>;
              })
            ) : (
              <div className="character-quotes__content__none"> None</div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

// birth: "FA 320"
// death: "FA 510"
// gender: "Male"
// hair: "Black"
// height: "Tall"
// name: "Maeglin"
// race: "Elf"
// realm: ""
// spouse: "None"
// wikiUrl: "http://lotr.wikia.com//wiki/Maeglin"

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
    </div>
  );
}
