import React, { useState } from 'react';
import styled from 'styled-components';

const HelpButton = styled.button`
  background-color: transparent;
  border: none;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
`;

interface HelpPopupProps {
  numPages: number;
}

const HelpPopup: React.FC<HelpPopupProps> = ({ numPages }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = (): void => {
    setIsOpen(true);
  };

  const closePopup = (): void => {
    setIsOpen(false);
  };

  return (
    <>
      <HelpButton onClick={openPopup}>Ajuda</HelpButton>

      {isOpen && (
        <PopupOverlay onClick={closePopup}>
          <PopupContent>
            <p>Descripció del servei:</p>
            <p>Nombre de pàgines seleccionades: {numPages}</p>
          </PopupContent>
        </PopupOverlay>
      )}
    </>
  );
};

export default HelpPopup;
