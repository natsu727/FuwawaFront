import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Bookshelf from "./components/Bookshelf";
import GenerateBook from "./components/GenerateBook";
import SearchBooks from "./components/SearchBooks";
import  "./App.css";





function App() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul className="accordion-area">
            <li>
              <Link to="/">トップページ</Link>
            </li>
            <li>
              <section>
                  <h3
                    className={`title ${activeAccordion === 0 ? "close" : ""}`}
                    onClick={() => handleAccordionClick(0)}
                  >
                    生成
                  </h3>
                  <div className="box" style={{ display: activeAccordion === 0 ? "block" : "none" }}>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      // フォーム送信のロジックをここに追加 多分
                    }}>
                      <label htmlFor="favoriteGenre">ジャンル:</label>
                      <select id="favoriteGenre" name="favoriteGenre" required>
                        <option value="other">選択無し</option>
                        <option value="SF">SF</option>
                        <option value="school">学園</option>
                        <option value="fantasy">ファンタジー</option>
                        <option value="mystery">ミステリー</option>
                        <option value="love">恋愛</option>
                      </select><br/>

                      <label htmlFor="bookInfo">詳細設定:</label><br/>
                      <textarea id="bookInfomation" name="bookInfo" maxLength="300" placeholder="例：追加のジャンル,ラノベ調,登場キャラクター,環境　等（最大300文字）" required/><br />


                      <input type="submit" value="送信" />
                    </form>
                  </div>
              </section>
            </li>
            <li>
              <section>
                <h3
                  className={`title ${activeAccordion === 1 ? "close" : ""}`}
                  onClick={() => handleAccordionClick(1)}
                >
                  蔵書検索
                </h3>
                <div className="box" style={{ display: activeAccordion === 1 ? "block" : "none" }}>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    // フォーム送信のロジックをここに追加
                  }}>
                    <label htmlFor="foundGenre">ジャンル:</label>
                    <select id="foundGenre" name="foundGenre" required>
                      <option value="other">選択無し</option>
                      <option value="SF">SF</option>
                      <option value="school">学園</option>
                      <option value="fantasy">ファンタジー</option>
                      <option value="mystery">ミステリー</option>
                      <option value="love">恋愛</option>
                    </select><br />

                    <label htmlFor="foundBook">本の名前:</label><br />
                    <input type="text" id="foundBook" name="foundBook" maxLength={18} size={35} required /><br />
                    <input type="submit" value="検索" />
                  </form>
                </div>
              </section>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Bookshelf />} />
          <Route path="/generate" element={<GenerateBook />} />
          <Route path="/search" element={<SearchBooks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;