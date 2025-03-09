import React from 'react';
import Movie from '../components/Movie';
import CatalogFilters from '../components/CatalogFilters';
import '../PagesStyles/MovieCatalog.css'; // Import the CSS file

const MovieCatalog = () => {
  const movies = [
    { id: 1, image: '', description: 'Movie 1 description', statistics: 'statistics xyz' },
    { id: 2, image: '', description: 'Movie 2 description', statistics: 'statistics xyz' },
    { id: 3, image: '', description: 'Movie 3 description', statistics: 'statistics xyz' },
    { id: 1, image: '', description: 'Movie 1 description', statistics: 'statistics xyz' },
    { id: 2, image: '', description: 'Movie 2 description', statistics: 'statistics xyz' },
    { id: 3, image: '', description: 'Movie 3 description', statistics: 'statistics xyz' },
    { id: 1, image: '', description: 'Movie 1 description', statistics: 'statistics xyz' },
    { id: 2, image: '', description: 'Movie 2 description', statistics: 'statistics xyz' },
    { id: 3, image: '', description: 'Movie 3 description', statistics: 'statistics xyz' },
    { id: 1, image: '', description: 'Movie 1 description', statistics: 'statistics xyz' },
    { id: 2, image: '', description: 'Movie 2 description', statistics: 'statistics xyz' },
    { id: 3, image: '', description: 'Movie 3 description', statistics: 'statistics xyz' },
    // Add more movies as needed
  ];

  return (
    <div>
      <div className="header">Placeholder Header</div> {/* Imaginary header */}
      <CatalogFilters />
      <div className="movies-container"> {/* Add class for spacing */}
        {movies.map((movie) => (
          <Movie key={movie.id} image={movie.image} description={movie.description} statistics={movie.statistics} />
        ))}
      </div>
    </div>
  );
};

export default MovieCatalog;
