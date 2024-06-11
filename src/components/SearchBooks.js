import React, { useState } from "react";

const SearchBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    // 検索処理を実装
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
        placeholder="Search by title, genre, or keyword"
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {searchResults.map((book) => (
          <div key={book.id}>
            <h3>{book.title}</h3>
            <p>Genre: {book.genre}</p>
            {/* 他の本の情報も表示 */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBooks;
