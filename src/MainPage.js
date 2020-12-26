import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { debounce } from 'debounce';
import Confetti from 'react-dom-confetti';

import { fetchMovies } from './utility';

import CompletionBanner from './CompletionBanner';
import ContentWrapper from './ContentWrapper';
import MovieResults from './MovieResults';
import MobileNominationSlider from './MobileNominationSlider';
import Nominations from './Nominations';

const Title = styled.div`
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 15px;

  @media (max-width: 375px) {
    font-size: 30px;
  }
`;

const BannerContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: 80%;
  margin-bottom: 15px;
  @media (max-width: 375px) {
    width: 100%;
  }
`;

const MainContent = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  @media (max-width: 375px) {
    padding: 0;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 5px;
  width: 60%;
  @media (max-width: 375px) {
    width: 100%;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 375px) {
    & > * {
      width: 100%;
    }

    & > *:nth-child(2) {
      display: none;
    }
  }
`;

const InputItem = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 25px;

  & > div {
    min-width: 100px;
    margin-right: 20px;
  }

  & > input {
    width: 100%;
    max-width: 900px;
    height: 50px;
    border: ${(props) =>
      props.emptyApi ? '2px solid #FF0000;' : '1px solid #000000'};
    background: #ffffff;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 15px;
  }

  & > input:disabled {
    cursor: not-allowed;
    background: rgba(106, 106, 106, 0.6);
  }

  @media (max-width: 375px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-left: 0;

    & > div {
      margin-bottom: 5px;
      font-size: 16px;
    }
  }
`;

const ConfettiContainer = styled.div`
  position: fixed;
  top: 0;
  right: 50%;
`;

const updateBackgroundColor = (nominations) => {
  switch (nominations.length) {
    case 1:
      return 'linear-gradient(180deg,#70d6ff 0%,rgba(255, 112, 166, 0.20) 100%)';
    case 2:
      return 'linear-gradient(180deg,#70d6ff 0%,rgba(255, 112, 166, 0.40) 100%)';
    case 3:
      return 'linear-gradient(180deg,#70d6ff 0%,rgba(255, 112, 166, 0.60) 100%)';
    case 4:
      return 'linear-gradient(180deg,#70d6ff 0%,rgba(255, 112, 166, 0.80) 100%)';
    case 5:
      return 'linear-gradient(180deg,#70d6ff 0%,rgba(255, 112, 166, 1) 100%)';
    default:
      return 'linear-gradient(180deg,#70d6ff 0%,rgba(255, 112, 166, 0.1) 100%)';
  }
};

const MainPage = () => {
  const [apiKey, setApiKey] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activateConfetti, SetActivateConfetti] = useState(false);
  const [results, setResults] = useState([]);
  const [resultDetails, setResultDetails] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [nominatedIds, setNominatedIds] = useState([]);

  document.body.style.background = updateBackgroundColor(nominations);

  useEffect(() => {
    if (nominations.length === 5) {
      SetActivateConfetti(true);
    }
  }, [nominations]);

  useEffect(() => {
    if (activateConfetti) {
      SetActivateConfetti(false);
    }
  }, [activateConfetti]);

  const emptyResultMessage = searchTerm
    ? 'Oh no! The results look empty. Please try another search term'
    : 'You can start searching by typing into the search box!';

  const handleOnChange = debounce((text) => {
    setSearchTerm(text);
    if (apiKey !== '' && text !== '') {
      fetchMovies(apiKey, text, (res) => setResults(res)).then((resDetails) =>
        setResultDetails(resDetails)
      );
    }
    if (text === '') {
      setResults([]);
    }
  }, 1000);

  const addNomination = (movie) => {
    const { imdbID: id } = movie;

    if (!nominatedIds.includes(id)) {
      setNominatedIds([...nominatedIds, id]);
      setNominations([...nominations, movie]);
    }
  };

  const removeNomination = (selectedMovie) => {
    const updatedNominatedIds = nominatedIds.filter(
      (id) => id !== selectedMovie.imdbID
    );

    const updatedNominations = nominations.filter(
      (movie) => movie.imdbID !== selectedMovie.imdbID
    );

    setNominatedIds(updatedNominatedIds);
    setNominations(updatedNominations);
  };

  return (
    <>
      <Title>The Shoppies</Title>
      <ConfettiContainer>
        <Confetti
          active={activateConfetti}
          config={{
            angle: 270,
            spread: 180,
            elementCount: 150,
          }}
        />
      </ConfettiContainer>

      <MobileNominationSlider
        nominations={nominations}
        removeNomination={removeNomination}
      />
      <MainContent>
        <SearchContainer>
          <InputItem emptyApi={apiKey === ''}>
            <div>API Key:</div>
            <input
              placeholder='Please enter your API key'
              onChange={(e) => setApiKey(e.target.value)}
            />
          </InputItem>
          <InputItem>
            <div>Search:</div>
            <input
              disabled={!apiKey}
              placeholder='eg. Home Alone'
              onChange={(e) => {
                e.persist();
                handleOnChange(e.target.value);
              }}
            />
          </InputItem>
        </SearchContainer>
        {nominations.length === 5 && (
          <BannerContainer>
            <CompletionBanner />
          </BannerContainer>
        )}
        <ContentContainer>
          <ContentWrapper
            title={`Results${searchTerm && ` for "${searchTerm}"`}:`}
            maxWidth={'60%'}
            isEmpty={!results.Search}>
            {results.Search ? (
              <MovieResults
                movies={results.Search}
                moviesDetails={resultDetails}
                nominatedIds={nominatedIds}
                handleNomination={(selectedMovie) =>
                  addNomination(selectedMovie)
                }
              />
            ) : (
              emptyResultMessage
            )}
          </ContentWrapper>
          <ContentWrapper
            className='hello'
            title={`Nomination (${nominations.length} / 5):`}
            maxWidth={'37%'}>
            <Nominations
              nominations={nominations}
              removeNomination={(selectedMovie) =>
                removeNomination(selectedMovie)
              }
            />
          </ContentWrapper>
        </ContentContainer>
      </MainContent>
    </>
  );
};

export default MainPage;
