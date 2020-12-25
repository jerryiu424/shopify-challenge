import React from 'react';
import styled from 'styled-components';

const Banner = styled.div`
  background-color: #ffffff;
  padding: 10px 0px;
  border-radius: 4px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  @media (max-width: 375px) {
    font-size: 16px;
  }
`;

const CompletionBanner = () => {
  return <Banner>🎉 Thank you for your nominations! 🎉</Banner>;
};

export default CompletionBanner;
