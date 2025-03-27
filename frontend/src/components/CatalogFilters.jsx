import React, { useEffect, useState } from 'react';
import '../ComponentStyles/CatalogFilters.css'; // Assuming you have a CSS file for styling

const phobiaList = [
  'Phobia1', 'Phobia2', 'Phobia3', 'Phobia4', 
  'Phobia5', 'Phobia6', 'Phobia7', 'Phobia8', 
  'Phobia9', 'Phobia10'
];

const CatalogFilters = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="catalog-filters">
      <div className="phobias">
        {/* {phobiaList.map((phobia, index) => (
          <div key={index} className="phobia-item">{phobia}</div>
        ))} */}
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." className="search-input" />
      </div>
    </div>
  );
};

export default CatalogFilters;
