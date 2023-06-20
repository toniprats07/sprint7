import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import QuantityInput from './QuantityInput';
import HelpIcon from './HelpIcon';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  border-radius: 8px;
  gap: 20px;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;

const RightColumn = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const CheckboxLabel = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const InputLabel = styled.label`
  display: felx;
  margin: 5px;
`;

const InputContainer = styled.div`
  border: 2px solid #ccc;
  border-radius: 4px;
  width: 400px;
  padding: 5px;
  margin-bottom: 10px;
`;

const Budget = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
`;

const BudgetList = styled.div`
  flex: 1;
  margin-left: 40px;
`;

const HelpButton = styled.button`
  background-color: transparent;
  border: none;
  color: grey;
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
  border: 2px solid black;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const OrderButton = styled.button`
  padding: 5px 10px;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

interface Selections {
  webPage: boolean;
  seoCampaign: boolean;
  adCampaign: boolean;
}

interface WebPageData {
  numPages: number;
  numLanguages: number;
}

interface Budget {
  budgetName: string;
  clientName: string;
  service: string;
  totalBudget: number;
  date: string;
}

const prices: Record<keyof Selections, number> = {
  webPage: 500,
  seoCampaign: 300,
  adCampaign: 200,
};

function BudgetScreen(): JSX.Element {
  const [selections, setSelections] = useState<Selections>({
    webPage: false,
    seoCampaign: false,
    adCampaign: false,
  });

  const [sortedBudgetList, setSortedBudgetList] = useState<Budget[]>([]);
  const [isSortedByAlphabet, setIsSortedByAlphabet] = useState(false);
  const [isSortedByDate, setIsSortedByDate] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // ORDEN ALFABÉTICO
  const handleSortAlphabetically = () => {
    const sortedList = [...budgetList].sort((a, b) =>
      a.budgetName.localeCompare(b.budgetName)
    );
    setSortedBudgetList(sortedList);
    setIsSortedByAlphabet(true);
    setIsSortedByDate(false);
  };


  // ORDEN POR FECHA
  const handleSortByDate = () => {
    const sortedList = [...budgetList].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setSortedBudgetList(sortedList);
    setIsSortedByAlphabet(false);
    setIsSortedByDate(true);
  };

  // RESETEAR ORDEN
  const handleResetOrder = () => {
    setSortedBudgetList([]);
    setIsSortedByAlphabet(false);
    setIsSortedByDate(false);
  };

  const [webPageData, setWebPageData] = useState<WebPageData>({
    numPages: 1,
    numLanguages: 1,
  });

  // Carregar les dades emmagatzemades al localStorage
  useEffect(() => {
    const storedSelections = localStorage.getItem('selections');
    const storedWebPageData = localStorage.getItem('webPageData');

    if (storedSelections) {
      setSelections(JSON.parse(storedSelections));
    }
    if (storedWebPageData) {
      setWebPageData(JSON.parse(storedWebPageData));
    }
  }, []);

  // Guardar les dades al localStorage quan canviïn
  useEffect(() => {
    localStorage.setItem('selections', JSON.stringify(selections));
    localStorage.setItem('webPageData', JSON.stringify(webPageData));
  }, [selections, webPageData]);

  // CAMBIO CASILLA SELECCIÓN
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = event.target;
    setSelections((prevSelections) => ({
      ...prevSelections,
      [name]: checked,
    }));
  };

  // CAMBIO DATOS WEB
  const handleWebPageDataChange = (name: keyof WebPageData, value: number): void => {
    setWebPageData((prevWebPageData) => ({
      ...prevWebPageData,
      [name]: value,
    }));
  };

  // CÁLCULO PRESUPUESTO TOTAL
  const totalBudget: number = Object.keys(selections).reduce((total, key) => {
    if (selections[key as keyof Selections]) {
      if (key === 'webPage') {
        const { numPages, numLanguages } = webPageData;
        const webPageCost = numPages * numLanguages * 30;
        return total + prices[key as keyof Selections] + webPageCost;
      }
      return total + prices[key as keyof Selections];
    }
    return total;
  }, 0);

  // FUNCIÓN AYUDA
  const [webPageHelpVisible, setWebPageHelpVisible] = useState(false);
  const [languageHelpVisible, setLanguageHelpVisible] = useState(false);

  const toggleWebPageHelp = () => {
    setWebPageHelpVisible(!webPageHelpVisible);
  };

  const toggleLanguageHelp = () => {
    setLanguageHelpVisible(!languageHelpVisible);
  };

  const [budgetName, setBudgetName] = useState('');
  const [clientName, setClientName] = useState('');
  const [budgetList, setBudgetList] = useState<Budget[]>([]);

  // AÑADIR PRESUPUESTO LISTA
  const addBudgetToList = () => {
    const budget: Budget = {
      budgetName,
      clientName,
      service: getServiceDescription(),
      totalBudget,
      date: new Date().toString(),
    };
    setBudgetList((prevBudgetList) => [...prevBudgetList, budget]);
    // Reset input values
    setBudgetName('');
    setClientName('');
  };

  // DESCRIPCIÓN SERVICIO
  const getServiceDescription = (): string => {
    let serviceDescription = '';
    if (selections.webPage) {
      const { numPages, numLanguages } = webPageData;
      serviceDescription += `Pàgina web (${numPages} pàgines, ${numLanguages} idiomes) `;
    }
    if (selections.seoCampaign) {
      serviceDescription += 'Campanya SEO ';
    }
    if (selections.adCampaign) {
      serviceDescription += 'Campanya de Google Ads ';
    }
    return serviceDescription.trim();
  };

  return (
    <Container>
      <LeftColumn>
      <Title>Pressupost</Title>
      <CheckboxLabel>
        <input
          type="checkbox"
          name="webPage"
          checked={selections.webPage}
          onChange={handleCheckboxChange}
        />
        Pàgina web (500 €)
      </CheckboxLabel>
      {selections.webPage && (
        <div>
          <InputContainer>
            <InputLabel>
              Nombre de pàgines
              <QuantityInput
                value={webPageData.numPages}
                onIncrement={() =>
                  handleWebPageDataChange('numPages', webPageData.numPages + 1)
                }
                onDecrement={() =>
                  handleWebPageDataChange('numPages', webPageData.numPages - 1)
                }
                onChange={(value) => handleWebPageDataChange('numPages', value)}
              />
              <HelpButton onClick={toggleWebPageHelp}>
                <HelpIcon />
              </HelpButton>
              {/* Web page help popup */}
              {webPageHelpVisible && (
                <PopupOverlay onClick={toggleWebPageHelp}>
                  <PopupContent>
                    <p>En aquest apartat has d'indicar el número de pàgines que vols en el teu projecte</p>
                  </PopupContent>
                </PopupOverlay>
              )}
            </InputLabel>

            <InputLabel>
              Nombre d'idiomes
              <QuantityInput
                value={webPageData.numLanguages}
                onIncrement={() =>
                  handleWebPageDataChange('numLanguages', webPageData.numLanguages + 1)
                }
                onDecrement={() =>
                  handleWebPageDataChange('numLanguages', webPageData.numLanguages - 1)
                }
                onChange={(value) => handleWebPageDataChange('numLanguages', value)}
              />
              <HelpButton onClick={toggleLanguageHelp}>
                <HelpIcon />
              </HelpButton>
              {/* Language help popup */}
              {languageHelpVisible && (
                <PopupOverlay onClick={toggleLanguageHelp}>
                  <PopupContent>
                    <p>En aquest apartat has d'indicar el número d'idiomes que vols en el teu projecte</p>
                  </PopupContent>
                </PopupOverlay>
              )}
            </InputLabel>
          </InputContainer>
        </div>
      )}
      <br />
      <CheckboxLabel>
        <input
          type="checkbox"
          name="seoCampaign"
          checked={selections.seoCampaign}
          onChange={handleCheckboxChange}
        />
        Campanya SEO (300 €)
      </CheckboxLabel>
      <br />
      <CheckboxLabel>
        <input
          type="checkbox"
          name="adCampaign"
          checked={selections.adCampaign}
          onChange={handleCheckboxChange}
        />
        Campanya de Google Ads (200 €)
      </CheckboxLabel>
      <br />
      <Budget>Pressupost total: {totalBudget} €</Budget>
      {/* Budget list */}
      <InputLabel>
        Nom del pressupost:
        <input type="text" value={budgetName} onChange={(e) => setBudgetName(e.target.value)} />
      </InputLabel>
      <InputLabel>
        Nom del client:
        <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} />
      </InputLabel>
      <button onClick={addBudgetToList}>Afegir Pressupost</button>
      </LeftColumn>

      <RightColumn>
      <ButtonContainer>
          <OrderButton onClick={handleSortAlphabetically}>
            Ordenar alfabèticament
          </OrderButton>
          <OrderButton onClick={handleSortByDate}>
            Ordenar per data
          </OrderButton>
          {isSortedByAlphabet || isSortedByDate ? (
            <OrderButton onClick={handleResetOrder}>
              Reinicialitzar ordre
            </OrderButton>
          ) : null}
        </ButtonContainer>
        <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Cercar pressupostos"
      />
      <BudgetList>
        <h2>Llistat de Pressupostos</h2>
        {isSortedByAlphabet || isSortedByDate ? (
          sortedBudgetList
            .filter((budget) =>
              budget.budgetName.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((budget, index) => (
              <div key={index}>
                <p>Nom de pressupost: {budget.budgetName}</p>
                <p>Nom del client: {budget.clientName}</p>
                <p>Servei seleccionat: {budget.service}</p>
                <p>Pressupost total: {budget.totalBudget} €</p>
                <p>Data: {budget.date}</p>
                <hr />
              </div>
            ))
          ) : (
            budgetList
            .filter((budget) =>
              budget.budgetName.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((budget, index) => (
              <div key={index}>
                <p>Nom de pressupost: {budget.budgetName}</p>
                <p>Nom del client: {budget.clientName}</p>
                <p>Servei seleccionat: {budget.service}</p>
                <p>Pressupost total: {budget.totalBudget} €</p>
                <p>Data: {budget.date}</p>
                <hr />
              </div>
            ))
          )}
        </BudgetList>
      </RightColumn>
    </Container>
  );
};

export default BudgetScreen;
