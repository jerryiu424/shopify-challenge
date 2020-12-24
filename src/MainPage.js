import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { debounce } from 'debounce';
import Confetti from 'react-dom-confetti';

import CompletionBanner from './CompletionBanner';
import ContentWrapper from './ContentWrapper';
import MovieResults from './MovieResults';
import Nominations from './Nominations';

const Title = styled.div`
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 15px;
`;

const BannerContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: 80%;
  margin-bottom: 15px;
`;

const MainContent = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;

const SearchContainer = styled.div`
  margin-bottom: 35px;
  width: 60%;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    width: 85%;
    margin-left: 0;

    & > div {
      margin-bottom: 5px;
    }
  }
`;

const ConfettiContainer = styled.div`
  position: fixed;
  top: 0;
  right: 50%;
`;

const MainPage = () => {
  const [apiKey, setApiKey] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activateConfetti, SetActivateConfetti] = useState(false);
  const [results, setResults] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [nominatedIds, setNominatedIds] = useState([]);

  useEffect(() => {
    if (nominations.length === 5) {
      SetActivateConfetti(true);
    }
    if (activateConfetti) {
      SetActivateConfetti(false);
    }
  }, [nominations]);

  const handleOnChange = debounce((text) => {
    setSearchTerm(text);
    if (apiKey !== '' && text !== '') {
      fetch(`https://www.omdbapi.com/?s=${text}&apiKey=${apiKey}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Could not fetch results');
          } else {
            return res.json();
          }
        })
        .then((data) => {
          setResults(data);
        })
        .catch((_err) => {
          console.log(
            "Handle error here (shouldn't reach here for this project)"
          );
        });
    }
    if (text === '') {
      setResults([]);
    }
  }, 300);

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

  const emptyResultMessage = searchTerm
    ? 'Oh no! The results look empty. Please try another search term'
    : 'You can start searching by typing into the search box!';

  return (
    <>
      <Title>Movie Finder</Title>
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
      {nominations.length === 5 && (
        <BannerContainer>
          <CompletionBanner />
        </BannerContainer>
      )}
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
        <ContentContainer>
          <ContentWrapper
            title={`Results${searchTerm && ` for "${searchTerm}"`}:`}
            maxWidth={'60%'}
            isEmpty={!results.Search}>
            {results.Search ? (
              <MovieResults
                movies={results.Search}
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
