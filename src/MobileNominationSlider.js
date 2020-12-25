import React, { useState } from 'react';
import styled from 'styled-components';
import Tooltip from 'rc-tooltip';
import Modal from 'react-modal';

import Nominations from './Nominations';

import 'rc-tooltip/assets/bootstrap.css';
import './tooltip.css';
import trophyIcon from './assets/trophy-icon.png';
import trophyIcon1 from './assets/trophy-icon-20percent.png';
import trophyIcon2 from './assets/trophy-icon-40percent.png';
import trophyIcon3 from './assets/trophy-icon-60percent.png';
import trophyIcon4 from './assets/trophy-icon-80percent.png';
import trophyIcon5 from './assets/trophy-icon-100percent.png';

const Wrapper = styled.div`
  display: none;
  position: fixed;
  top: 20px;
  right: 25px;
  @media (max-width: 375px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const TrophyIcon = styled.img`
  width: 35px;
  height: 40px;
`;

const NominationModal = styled(Modal)`
  background-color: #ffffff;
  width: 80%;
  min-height: 50%;
  height: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  transform: translate(-50%, -50%);

  & > *:nth-child(2){
    margin: 35px 15px;
    width: auto;
  }
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 20px 15px 0px 15px;
`;

Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.5)';

const getTrophyIcon = (numOfNomination) => {
  switch (numOfNomination) {
    case 1:
      return trophyIcon1;
    case 2:
      return trophyIcon2;
    case 3:
      return trophyIcon3;
    case 4:
      return trophyIcon4;
    case 5:
      return trophyIcon5;
    default:
      return trophyIcon;
  }
};

const MobileNominationSlider = ({ nominations, removeNomination }) => {
  const [openModal, setOpenModal] = useState(false);

  const trophyImage = getTrophyIcon(nominations.length);

  return (
    <Wrapper>
      <Tooltip
        placement='bottomRight'
        trigger={['hover']}
        overlay={<div>Cick to view nominations</div>}>
        <div onClick={() => setOpenModal(!openModal)}>
          <TrophyIcon src={trophyImage} alt="Nominations icon"/>
        </div>
      </Tooltip>
      <div>{nominations.length}/5</div>

      <NominationModal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        shouldCloseOnOverlayClick={true}>
        <Title>{`Nomination (${nominations.length} / 5):`}</Title>
        <Nominations
          className='nominations'
          nominations={nominations}
          removeNomination={(selectedMovie) => removeNomination(selectedMovie)}
        />
      </NominationModal>
    </Wrapper>
  );
};

export default MobileNominationSlider;
