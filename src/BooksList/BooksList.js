import React from "react";
import "./styles.css";
import Loader from "../Loader";
import { useBooks } from "./utils";

// shows list of books
export default function BooksList() {
  const [books] = useBooks();
  return (
    <div className="books">
      <div className="books__list">
        {books.length ? (
          books.map(function(book) {
            return (
              <div key={book._id} className="books__list__item">
                <div>{book.name}</div>
              </div>
            );
          })
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
