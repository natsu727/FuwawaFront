import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
// import React from 'react';
// import Sample from './Sample';

function BookDetail() {
  const style = {
    width: "50%",
    margin: "0 auto",
    marginTop: 150,
  };

  return (
    <div className="App">
      <div style={style}>
        <Sample />
      </div>
    </div>
  );
}

export default BookDetail;
