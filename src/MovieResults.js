import React from 'react';
import styled from 'styled-components';

import MovieCard from './MovieCard';

const ResultsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const MovieResults = ({ movies, nominatedIds, handleNomination }) => {
  return (
    <ResultsWrapper>
      {movies?.map((movie, idx) => {
        return (
          <MovieCard
            key={idx}
            movie={movie}
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
