import React, { useState, useEffect } from "react";
import axios from "../AxiosInstance";
import "./styles.css";

function getBooksUrl(bookId, chapter = false) {
  let path = "";
  if (bookId) {
    path = `/book/${bookId}`;
    path += chapter ? "/chapter" : "";
  } else {
    path = "/book";
  }
  return path;
}

function apiCall(url, setBooks, handleResp, handleErr) {
  handleResp = handleResp
    ? handleResp
    : function(res) {
        setBooks(res.data.docs);
      };
  handleErr = handleErr
    ? handleErr
    : () => {
        setBooks(noneBooks);
      };
  axios
    .get(url)
    .then(handleResp)
    .catch(handleErr);
}

const noneBooks = [];
const noneChapters = [];

function useBooks() {
  const [books, setBooks] = useState(noneBooks);
  const [chapters, setChapters] = useState(noneChapters);
  useEffect(function() {
    const url = getBooksUrl();
    apiCall(url, setBooks);
  }, []);

  function getChapters(bookId) {
    const url = getBooksUrl(bookId, true);
    apiCall(url, setChapters);
  }

  function getChapterDetails(id) {
    let path = `/chapter/${id}`;
    // axios.get(path).then(res => console.log(res));
  }

  return [books, chapters, getChapters, getChapterDetails];
}

export default function BooksList() {
  const [books] = useBooks();
  return (
    <div className="books">
      {/* <div className="books__header">Books</div> */}
      <div className="books__list">
        {books.map(function(book) {
          return (
            <div key={book._id} className="books__list__item">
              <div>{book.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
