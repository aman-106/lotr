import axios from "../AxiosInstance";
import { useState, useEffect } from "react";

export function getBooksUrl(bookId, chapter = false) {
  let path = "";
  if (bookId) {
    path = `/book/${bookId}`;
    path += chapter ? "/chapter" : "";
  } else {
    path = "/book";
  }
  return path;
}

export function apiCall(url, setBooks, handleResp, handleErr) {
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

export const noneBooks = [];
export const noneChapters = [];

export function useBooks() {
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
