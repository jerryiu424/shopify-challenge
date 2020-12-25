import React from 'react';
import styled from 'styled-components';

import MovieCard from './MovieCard';

const ResultsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 1090px) {
    flex-direction: column;
    width: 100%;
  }
`;

const findDetailById = (id, details) => {
  return details ? details.filter((movie) => movie.imdbID === id) : [];
};

const MovieResults = ({
  movies,
  moviesDetails,
  nominatedIds,
  handleNomination,
}) => {
  return (
    <ResultsWrapper>
      {movies?.map((movie, idx) => {
        const movieDetails = findDetailById(movie.imdbID, moviesDetails);

        return (
          <MovieCard
            key={idx}
            movie={movie}
            movieDetails={movieDetails.length > 0 && movieDetails[0]}
            nominatedIds={nominatedIds}
            handleNomination={(selectedMovie) =>
              handleNomination(selectedMovie)
            }
          />
        );
      })}
    </ResultsWrapper>
  );
};

export default MovieResults;
