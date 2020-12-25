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

const MovieResults = ({
  movies,
  moviesDetails,
  nominatedIds,
  handleNomination,
}) => {
  return (
    <ResultsWrapper>
      {movies?.map((movie, idx) => {
        return (
          <MovieCard
            key={idx}
            movie={movie}
            movieDetails={moviesDetails && moviesDetails[movie.imdbID]}
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
