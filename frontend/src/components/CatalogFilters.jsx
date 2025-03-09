import React, { useEffect, useState } from 'react';
import '../ComponentStyles/CatalogFilters.css'; // Assuming you have a CSS file for styling

const phobiaList = [
  'Phobia1', 'Phobia2', 'Phobia3', 'Phobia4', 
  'Phobia5', 'Phobia6', 'Phobia7', 'Phobia8', 
  'Phobia9', 'Phobia10'
];

const CatalogFilters = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const phobiasContainer = document.querySelector('.phobias');
    const phobias = document.querySelectorAll('.phobia-item');
    let offset = 0;

    const animatePhobias = () => {
      offset += 0.5; // Decreased from 1 to 0.2 to slow down the speed
      if (offset >= phobias[0].offsetWidth) {
        offset = 0;
        setCurrentIndex((prevIndex) => (prevIndex + 1) % phobiaList.length);
      }
      phobiasContainer.style.transform = `translateX(${offset}px)`;

      // Adjust opacity for cross dissolve effect
      phobias.forEach((phobia, index) => {
        const phobiaOffset = phobia.offsetLeft + offset;
        const containerWidth = phobiasContainer.offsetWidth;
        const fadeWidth = phobias[0].offsetWidth;

        if (phobiaOffset < fadeWidth) {
          phobia.style.opacity = phobiaOffset / fadeWidth;
        } else if (phobiaOffset > containerWidth - fadeWidth) {
          phobia.style.opacity = (containerWidth - phobiaOffset) / fadeWidth;
        } else {
          phobia.style.opacity = 1;
        }

        // Adjust visibility for cross dissolve effect
        if (phobiaOffset < 0 || phobiaOffset > containerWidth) {
          phobia.style.visibility = 'hidden';
        } else {
          phobia.style.visibility = 'visible';
        }
      });

      requestAnimationFrame(animatePhobias);
    };

    animatePhobias();
  }, [currentIndex]);

  return (
    <div className="catalog-filters">
      <div className="phobias">
        {phobiaList.map((phobia, index) => (
          <div key={index} className="phobia-item">{phobia}</div>
        ))}
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." className="search-input" />
      </div>
    </div>
  );
};

export default CatalogFilters;
