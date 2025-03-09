import React from 'react';
import '../ComponentStyles/Movie.css'; // Import the new CSS file

const Movie = ({ image, description, statistics }) => {
    return (
        <div className="movie-container">
            {image ? (
                <img src={image} alt="Movie Poster" className="movie-image" />
            ) : (
                <div className="default-style movie-poster">No Image</div>
            )}
            <div className="movie-description">
                {description}
            </div>
            <div className="movie-statistics">
                {statistics}
            </div>
        </div>
    );
};

export default Movie;
