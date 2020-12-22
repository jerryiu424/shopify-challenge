import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { debounce } from 'debounce';

import ContentWrapper from './ContentWrapper';

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
  const [nominations, setNominations] = useState([]);

  const handleOnChange = debounce((text) => setSearchTerm(text), 300);

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
              placeholder='search ...'
              onChange={(e) => {
                // e.persist();
                handleOnChange(e.target.value);
              }}
            />
          </InputItem>
        </SearchContainer>
        <ContentContainer>
          <ContentWrapper
            apiKey={apiRef?.current?.value}
            title={'Results'}
            maxWidth={'60%'}
            searchTerm={searchTerm}>
            hello world
          </ContentWrapper>
          <ContentWrapper
            apiKey={apiRef?.current?.value}
            title={`Nomination (${nominations.length} / 5)`}
            maxWidth={'37%'}
            searchTerm={searchTerm}>
            hello world
          </ContentWrapper>
        </ContentContainer>
        <div>{searchTerm}</div>
      </MainContent>
    </>
  );
};

export default MainPage;
