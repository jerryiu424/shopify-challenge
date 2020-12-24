import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: rgba(255, 255, 255, 0.85);
  width: ${(props) => props.maxWidth};
  height: calc(100vh * 0.65);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  & > * {
    padding: 0px 35px;
  }
  & > .child {
    display: flex;
    margin: ${(props) => props.isEmpty && 'auto'};;
    padding: ${(props) => props.isEmpty && '0px 60px'};
    text-align: ${(props) => props.isEmpty && 'center'};
    font-size: ${(props) => props.isEmpty && '36px'};
    color: ${(props) => props.isEmpty && '#6a6a6a'};
    justify-content: ${(props) => (props.isEmpty ? 'center' : 'space-between')};
  }
`;

const Title = styled.div`
  margin-top: 35px;
  font-size: 25px;
  font-weight: bold;
`;

const ContentWrapper = ({ title, maxWidth, children, isEmpty = false }) => {
  return (
    <Wrapper maxWidth={maxWidth} isEmpty={isEmpty}>
      <Title>{title}</Title>
      <div className='child'>{children}</div>
    </Wrapper>
  );
};

export default ContentWrapper;
