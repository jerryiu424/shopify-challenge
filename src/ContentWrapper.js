import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: rgba(255, 255, 255, 0.85);
  width: ${(props) => props.maxWidth};
  height: calc(100vh * 0.65);
  & > * {
    padding: 0px 35px;
  }
  overflow-y: auto;
`;

const Title = styled.div`
  margin-top: 35px;
  font-size: 25px;
  font-weight: bold;
`;

const ContentWrapper = ({ title, maxWidth, children }) => {
  return (
    <Wrapper maxWidth={maxWidth}>
      <Title>{title}</Title>
      <div>{children}</div>
    </Wrapper>
  );
};

export default ContentWrapper;
