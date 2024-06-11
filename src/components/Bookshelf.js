import React from "react";
import { Link } from "react-router-dom";
import "./Bookshelf.css";

const books = [
  { id: 1, title: "短いタイトル", genre: "Fiction" },
  { id: 2, title: "この本のタイトルはとても長いです", genre: "Non-Fiction" },
  { id: 3, title: "シンデレラ", genre: "Fiction" },
  // 他の本のデータも追加
];

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Bookshelf = () => {
  return (
    <div>
      <h2>本棚</h2>
      <div className="bookshelf">
        {books.map((book) => (
          <Link to={`/book/${book.id}`} key={book.id} className="book">
            <div
              className="book-spine"
              style={{
                height: `${20 + book.title.length * 20}px`,
                backgroundColor: getRandomColor(),
              }}
            >
              {book.title.split("").map((char, index) => (
                <span key={index}>{char}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Bookshelf;
