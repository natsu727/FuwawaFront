import React from "react";

const BookDetail = ({ match }) => {
  return (
    <div>
      <h2>Book Detail</h2>
      {/* IDに基づいて本の情報を取得し表示する */}
      <h3>Book Title</h3>
      <p>Book Content...</p>
    </div>
  );
};

export default BookDetail;
