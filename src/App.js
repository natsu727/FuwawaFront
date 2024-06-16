import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Bookshelf from "./components/Bookshelf";
import GenerateBook from "./components/GenerateBook";
import SearchBooks from "./components/SearchBooks";
import "./App.css";
import BookDetail from "./components/BookDetail";

function App() {
  const [accordionStatus] = useState(false); // Accordion status state

  return (
    <Router>
      <div id="root">
        <nav>
          <li>
            <Link to="/" className="title">本棚</Link>
          </li>
          <ul className="accordion-area">
            <section>
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
          <Route path="/" element={<Bookshelf />} />
          <Route path="/generate" element={<GenerateBook />} />
          <Route path="/search" element={<SearchBooks />} />
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
