import React, { useState } from "react";
import "../App.css";

const SearchBooks = ({isOpen}) => {
  const [searchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeAccordion, setActiveAccordion] = useState(isOpen);
  const [genre, setGenre] = useState(""); // genreの初期値を追加

  const handleAccordionClick = () => {
    // setActiveAccordion(activeAccordion === index ? null : index);
    setActiveAccordion(!activeAccordion)
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`API_URL/search?q=${searchTerm}&genre=${genre}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

  return (
    <div>
      <div
        className={`title ${activeAccordion ? "close" : ""}`}
        onClick={() => handleAccordionClick()}
      >
        蔵書検索
      </div>
      <div className="box" style={{ display: activeAccordion ? "block" : "none" }}>
        <label htmlFor="favoriteGenre">ジャンル：</label>
        <select id="favoriteGenre" value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">選択無し</option>
          <option value="SF">SF</option>
          <option value="学園">学園</option>
          <option value="ファンタジー">ファンタジー</option>
          <option value="ミステリー">ミステリー</option>
          <option value="恋愛">恋愛</option>
        </select><br />
        
        <button onClick={handleSearch}>検索</button>
        <div>
          {searchResults.map((book) => (
            <div key={book.id}>
              <h3>{book.title}</h3>
              <p>ジャンル: {book.genre}</p>
              {/* 他の本の情報も表示 */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBooks;
