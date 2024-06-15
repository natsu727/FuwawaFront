import React, { useState } from "react";

const SearchBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`API_URL/search?q=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

  return (
    <div>
      <h2>蔵書検索</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="タイトル、ジャンル、キーワードで検索"
      />
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
  );
};

export default SearchBooks;
