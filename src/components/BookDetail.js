import React from 'react';
import Sample from './Sample'; // インポート先がSampleとなっていますが、実際のファイル名に合わせてください
// import './App.css';

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
