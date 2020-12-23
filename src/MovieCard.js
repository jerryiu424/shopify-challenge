import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 250px;
  height: auto;
  min-height: 350px;
  margin-bottom: 35px;
`;

const MovieInfo = styled.div`
  height: auto;
  text-align: center;
  margin-bottom: 5px;
`;

const Image = styled.img`
  width: 100%;
  height: 250px;
`;

const NominateButton = styled.div`
  background-color: ${(props) => (props.disabled ? '#6a6a6a' : '#3ea2ff')};
  color: #ffffff;
  border-radius: 0px 0px 4px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  font-weight: bold;
  font-size: 18px;

  &:hover {
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  }
`;

const MovieCard = ({ movie, nominatedIds, handleNomination }) => {
  const { imdbID: id, Title: title, Year: year, Poster: imgUrl } = movie;
  const isNominated = nominatedIds.includes(id);
  const disableAll = nominatedIds.length === 5;

  return (
    <CardWrapper>
      <MovieInfo>
        <b>{title}</b> (<b>{year}</b>)
      </MovieInfo>
      <Image src={imgUrl} />
      <NominateButton
        disabled={isNominated || disableAll}
        onClick={() => {
          handleNomination(movie);
        }}>
        Nominate
      </NominateButton>
    </CardWrapper>
  );
};

export default MovieCard;
