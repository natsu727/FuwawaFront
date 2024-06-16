import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Bookshelf.css";

const getRandomColor = () => {
  let color = "rgba(";
  color += Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + "," + 0.3 + ")";
  return color;
};

const Bookshelf = ({isState}) => {
  const [books, setBooks] = useState([]);
  // const [viewState,setViewState]=useState(false);
  useEffect(() => {
    fetch("https://fuwawa-back2.onrender.com/")
      .then((response) => response.json())
      .then((data) => setBooks(data));
    // const fetchBooks = async () => {
    //   try {
    //     const response = await fetch("https://fuwawa-back2.onrender.com/");
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     const data = await response.json();
    //     setBooks(data);
    //   } catch (error) {
    //     console.error("Failed to fetch books:", error);
    //   }
    // };
    // fetchBooks();
  }, []);
  return (
    <div className="fadeRight" style ={{display: isState ? "block":"none"}}>
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
