import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import styled from 'styled-components';
import WelcomeScreen from './components/WelcomeScreen';
import BudgetScreen from './components/BudgetScreen';

const NavContainer = styled.nav`
  display: flex;
  padding: 20px;
  align-items: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  margin-right: 30px;
  font-weight: bold;

  &:hover {
    color: orange;
  }
`;

function App(): JSX.Element {
  return (
    <Router>
      <div>
        <NavContainer>
            <NavLink to="/">Benvinguda</NavLink>
            <NavLink to="/pressupost">Pressupost</NavLink>
        </NavContainer>

        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/pressupost" element={<BudgetScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;