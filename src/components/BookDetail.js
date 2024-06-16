import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./BookDetail.css";

const BookDetail = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [visibleContent, setVisibleContent] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // サンプルデータ
    // const sampleContent = "これはサンプルの本の内容です。".repeat(100); // 繰り返しで長いサンプルテキストを作成
    // setContent(sampleContent);
    // setVisibleContent(sampleContent.substring(0, 200));

    fetch(`https://fuwawa-back2.onrender.com/data/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setContent(data.content);
        setVisibleContent(data.content.substring(0, 200));
      });
  }, [id]);

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    const startIndex = nextPage * 200;
    const endIndex = startIndex + 200;
    setVisibleContent(content.substring(startIndex, endIndex));
    setCurrentPage(nextPage);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      const prevPage = currentPage - 1;
      const startIndex = prevPage * 200;
      const endIndex = startIndex + 200;
      setVisibleContent(content.substring(startIndex, endIndex));
      setCurrentPage(prevPage);
    }
  };

  return (
    <div className="book-detail">
      <div className="book-content">
        <p>{visibleContent}</p>
      </div>
      <div className="navigation-buttons">
        <button onClick={handlePrevPage} disabled={currentPage === 0}>
          前のページ
        </button>
        <button onClick={handleNextPage} disabled={currentPage * 200 >= content.length}>
          次のページ
        </button>
      </div>
    </div>
  );
};

export default BookDetail;
