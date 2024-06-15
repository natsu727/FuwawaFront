import React, { useState } from "react";

const GenerateBook = () => {
  const [genre, setGenre] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // フォームの内容をAPIに送信して本を生成する処理を実装？？？
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  return (
    <div>
      <h2>Generate Book</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ジャンル:
          <select value={genre} onChange={handleGenreChange}>
            <option value="SF">SF</option>
            <option value="Rennai">恋愛</option>
            <option value="Misuteri">ミステリー</option>
            {/* 他のジャンルを追加するなら */}
          </select>
        </label>
        <label>
          フリーワード:
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </label>
        <button type="submit">生成</button>
      </form>
    </div>
  );
};

export default GenerateBook;
