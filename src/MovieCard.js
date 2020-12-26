import React from 'react';
import styled from 'styled-components';

import posterError from './assets/poster-error.png';
import './animation.css';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 250px;
  height: auto;
  min-height: 350px;
  margin-bottom: 35px;

  @media (max-width: 1090px) {
    width: 100%;
    min-height: 150px;
    flex-direction: row;
    justify-content: flex-start;

    & > .mobileContainer {
      display: flex;
      flex-direction: column;
      margin-left: 20px;
      justify-content: space-evenly;
      width: 200px;
    }
  }
`;

const MovieInfo = styled.div`
  height: auto;
  text-align: center;
  margin-bottom: 5px;

  @media (max-width: 1090px) {
    display: none;
  }
`;

const MobileMovieInfo = styled(MovieInfo)`
  display: none;
  @media (max-width: 1090px) {
    display: inline;
    text-align: left;
  }
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

  @media (max-width: 1090px) {
    border-radius: 4px;
  }
`;

const MovieCard = ({
  movie,
  movieDetails = '',
  nominatedIds,
  handleNomination,
}) => {
  const { imdbID: id, Title: title, Year: year, Poster: imgUrl } = movie;
  const {
    Genre: genre = null,
    Language: language = null,
    imdbRating: rating = null,
    Rated: rated = null,
  } = movieDetails;
  const isNominated = nominatedIds.includes(id);
  const disableAll = nominatedIds.length >= 5;

  return (
    <CardWrapper>
      <MovieInfo>
        <b>{title}</b> (<b>{year}</b>)
      </MovieInfo>
      <div
        className='flip-container'
        onTouchStart={() => this?.classList?.toggle('hover')}>
        <div className='flipper'>
          <div className='front'>
            <img
              src={(imgUrl !== "N/A"  && imgUrl) || posterError}
              style={{ width: '100%', height: '100%' }}
              alt='Movie poster'
            />
          </div>
          <div className='back'>
            {genre && (
              <div>
                <b>Genre: </b> {genre}
              </div>
            )}
            {language && (
              <div>
                <b>Language: </b> {language}
              </div>
            )}
            {rated && (
              <div>
                <b>Rated: </b> {rated}
              </div>
            )}
            {rating && (
              <div>
                <b>IMDB Rating: </b> {rating}
              </div>
            )}
            {!genre && !language && !rated && !rating && (
              <div>Sorry there's no additional info at this time</div>
            )}
          </div>
        </div>
      </div>
      <div className='mobileContainer'>
        <MobileMovieInfo>
          <b>{title}</b> (<b>{year}</b>)
        </MobileMovieInfo>
        <NominateButton
          disabled={isNominated || disableAll}
          onClick={() => {
            if (nominatedIds.length < 5) {
              handleNomination(movie);
            }
          }}>
          Nominate
        </NominateButton>
      </div>
    </CardWrapper>
  );
};

export default MovieCard;
