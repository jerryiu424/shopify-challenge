import React from 'react';
import styled from 'styled-components';

import trashIcon from './assets/trash-icon.png';

const NominationsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 35px;
  width: 100%;
`;

const NominationItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  margin-bottom: 50px;
`;

const TrashIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 15px;

  &:hover {
    cursor: pointer;
  }
`;

const Nominations = ({ nominations, removeNomination }) => {
  return (
    <NominationsWrapper>
      {nominations?.map((movie, idx) => {
        const { Title, Year } = movie;
        return (
          <NominationItem key={idx}>
            <div>
              <b>
                {idx + 1}. {Title} ({Year})
              </b>
            </div>
            <TrashIcon
              src={trashIcon}
              onClick={() => removeNomination(movie)}
            />
          </NominationItem>
        );
      })}
    </NominationsWrapper>
  );
};

export default Nominations;
