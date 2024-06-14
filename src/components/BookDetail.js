import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`API_URL/books/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch book");
        }
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error(`Error fetching book details for id ${id}:`, error);
        setBook(null); // エラー時に book を null に設定して、エラーメッセージを表示する
      }
    };
    fetchBook();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Book Detail</h2>
      <h3>{book.title}</h3>
      <p>{book.content}</p>
    </div>
  );
};

export default BookDetail;