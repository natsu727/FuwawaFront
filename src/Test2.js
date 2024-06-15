import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Bookshelf from "./components/Bookshelf";
import GenerateBook from "./components/GenerateBook";
import SearchBooks from "./components/SearchBooks";
import Test from "./components/Test";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">トップページ</Link>
            </li>
            <li>
              <h3 className="title">生成ページ</h3>
              <div className="box">
                <form action="submit.php" method="post">
                    <h1>本のアンケート</h1>
                
                    <label for="likesBooks">本は好きですか？</label><br/>
                    <input type="radio" id="like" name="likesBooks" value="like" required/>
                    <label for="like">好き</label><br/>
                    <input type="radio" id="dislike" name="likesBooks" value="dislike"/>
                    <label for="dislike">嫌い</label><br/>
                  
                    <label for="favoriteGenre">好きな本のジャンル:</label>
                    <select id="favoriteGenre" name="favoriteGenre" required>
                        <option value="">選択してください</option>
                        <option value="rennai">恋愛</option>
                        <option value="nonfiction">ノンフィクション</option>
                        <option value="fantasy">ファンタジー</option>
                        <option value="mystery">ミステリー</option>
                        <option value="SF">SF</option>
                    </select><br/>
                    
                    <label for="favoriteBook">好きな本の名前:</label><br/>
                    <input type="text" id="favoriteBook" name="favoriteBook" required/><br/>
                
                    <input type="submit" value="送信"/>
                </form>
              </div>
            </li>
            <li>
              <Link to="/search">蔵書検索</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Bookshelf />} />
          <Route path="/generate" element={<GenerateBook />} />
          <Route path="/search" element={<SearchBooks />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
