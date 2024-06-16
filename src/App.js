import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Bookshelf from "./components/Bookshelf";
import GenerateBook from "./components/GenerateBook";
import SearchBooks from "./components/SearchBooks";
import "./App.css";
import BookDetail from "./components/BookDetail";


function App() {
  const[accordionStatus]=useState(false);
  const [State,setState]=useState(false);
  return (
    <Router>
      <div id="root">
        <nav>
          <div>
            <Link to="/" className="topName">無間図書館</Link>
          </div>
          <ul className="accordion-area">
            <section>
              <il>
                <Link to="/"><div className="topPage" onClick={()=>setState(true)}>本棚</div></Link>
              </il>
              <li>
                <GenerateBook isOpen={accordionStatus} />
              </li>
              <li>
                <SearchBooks isOpen={accordionStatus} />
              </li>
            </section>
            
           {/* <ul className="menu"> */}
             {/* <li> */}
               {/* <Link to="">トップページ</Link> */}
             {/* </li> */}
             {/* <li> */}
               {/* <Link to="/generate">生成ページ</Link> */}
             {/* </li> */}
             {/* <li> */}
               {/* <Link to="/search">蔵書検索</Link> */}
             {/* </li> */}
             {/* <button> */}
               {/* ログイン */}
             {/* </button> */}
           {/* </ul> */}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Bookshelf isState={State}/>} />
          <Route path="/generate" element={<GenerateBook />} />
          <Route path="/search" element={<SearchBooks />} />

          {/* テスト用 */}
          <Route path="/detail/:id" element={<BookDetail />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;