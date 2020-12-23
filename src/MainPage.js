import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { debounce } from 'debounce';

import ContentWrapper from './ContentWrapper';
import MovieResults from './MovieResults';
import Nominations from './Nominations';

const Title = styled.div`
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 35px;
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
    border: 1px solid #000000;
    background: #ffffff;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 15px;
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

const MainPage = () => {
  const apiRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [nominatedIds, setNominatedIds] = useState([]);

  const handleOnChange = debounce((text) => {
    const apiKey = apiRef.current.value;
    setSearchTerm(text);
    if (apiKey !== '' && text !== '') {
      fetch(`http://www.omdbapi.com/?s=${text}&apiKey=${apiKey}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Could not fetch results');
          } else {
            return res.json();
          }
        })
        .then((data) => {
          console.log('data:', data);
          setResults(data);
        })
        .catch((_err) => {
          console.log(
            "Handle error here (shouldn't reach here for this project)"
          );
        });
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

  return (
    <>
      <Title>Movie Finder</Title>
      <MainContent>
        <SearchContainer>
          <InputItem>
            <div>API Key:</div>
            <input ref={apiRef} placeholder='Please put your api key here' />
          </InputItem>
          <InputItem>
            <div>Search:</div>
            <input
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
            maxWidth={'60%'}>
            <MovieResults
              movies={results.Search}
              nominatedIds={nominatedIds}
              handleNomination={(selectedMovie) => addNomination(selectedMovie)}
            />
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
