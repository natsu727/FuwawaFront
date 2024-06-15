import React from 'react';
import HTMLFlipBook from 'react-pageflip';

const Sample = () => {
  const pages = [
    { image: 'https://cdn.pixabay.com/photo/2020/06/07/20/07/moscow-5271909_1280.jpg', alt: 'ページ1' },
    { image: 'https://cdn.pixabay.com/photo/2020/05/17/09/10/mountain-spring-5180660__480.jpg', alt: 'ページ2' },
    { image: 'https://cdn.pixabay.com/photo/2020/01/17/19/39/landscape-4773879__480.jpg', alt: 'ページ3' },
  ];

  return (
    <div>
      <HTMLFlipBook width={300} height={500}>
        {pages.map((page, index) => (
          <div key={`page-${index}`} className="demoPage">
            <img src={page.image} width={300} height={500} alt={page.alt}></img>
          </div>
        ))}
        {pages.map((page, index) => (
          <div key={`page-back-${index}`} className="demoPage">
            <img src={page.image} width={300} height={500} alt={page.alt}></img>
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
}

export default Sample;
