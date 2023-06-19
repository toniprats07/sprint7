import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  text-align: center;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

function WelcomeScreen(): JSX.Element {
  return (
    <Container>
      <Title>Benvinguda</Title>
      <p>Aquesta és una aplicació per a generar pressupostos de serveis.</p>
      <p>Seleccioneu els serveis que necessiteu i personalitzeu-ne les opcions.</p>
    </Container>
  );
}

export default WelcomeScreen;
