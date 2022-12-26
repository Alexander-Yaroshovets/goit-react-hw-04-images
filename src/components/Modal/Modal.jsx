import { useEffect } from 'react';

import { createPortal } from 'react-dom';

import { Overlay } from './Modal.styled.jsx';

import { StyledModal, StyledLargeImg } from './Modal.styled.jsx';

const ModalRoot = document.querySelector('#modal-root');

export const Modal = ({ bigImage, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handlebBackDropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handlebBackDropClick}>
      <StyledModal>
        <StyledLargeImg src={bigImage} alt="" />
      </StyledModal>
    </Overlay>,

    ModalRoot
  );
};
