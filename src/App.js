import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Bookshelf from "./components/Bookshelf";
import GenerateBook from "./components/GenerateBook";
import SearchBooks from "./components/SearchBooks";
import "./App.css";
import BookDetail from "./components/BookDetail";

function App() {
  const [accordionStatus] = useState(false); // Accordion status state
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
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Bookshelf isState={State}/>} />
          <Route path="/generate" element={<GenerateBook />} />
          <Route path="/search" element={<SearchBooks />} />
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;