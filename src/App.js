import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Bookshelf from "./components/Bookshelf";
import GenerateBook from "./components/GenerateBook";
import SearchBooks from "./components/SearchBooks";
import "./App.css";


function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul className="menu">
            <li>
              <Link to="/">トップページ</Link>
            </li>
            <li>
              <Link to="/generate">生成ページ</Link>
            </li>
            <li>
              <Link to="/search">蔵書検索</Link>
            </li>
            <button>
              ログイン
            </button>
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
