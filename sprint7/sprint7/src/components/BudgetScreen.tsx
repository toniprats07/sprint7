import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import QuantityInput from './QuantityInput';

interface Selections {
  webPage: boolean;
  seoCampaign: boolean;
  adCampaign: boolean;
}

interface WebPageData {
  numPages: number;
  numLanguages: number;
}

const prices: Record<keyof Selections, number> = {
  webPage: 500,
  seoCampaign: 300,
  adCampaign: 200,
};

const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  border-radius: 8px;
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
  display: block;
  margin-bottom: 5px;
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

function BudgetScreen(): JSX.Element {
    const [selections, setSelections] = useState<Selections>({
        webPage: false,
        seoCampaign: false,
        adCampaign: false,
      });
    
      const [webPageData, setWebPageData] = useState<WebPageData>({
        numPages: 1,
        numLanguages: 1,
      });
    
      useEffect(() => {
        // Carregar les dades emmagatzemades al localStorage
        const storedSelections = localStorage.getItem('selections');
        const storedWebPageData = localStorage.getItem('webPageData');
    
        if (storedSelections) {
          setSelections(JSON.parse(storedSelections));
        }
    
        if (storedWebPageData) {
          setWebPageData(JSON.parse(storedWebPageData));
        }
      }, []);
    
      useEffect(() => {
        // Guardar les dades al localStorage quan canviïn
        localStorage.setItem('selections', JSON.stringify(selections));
        localStorage.setItem('webPageData', JSON.stringify(webPageData));
      }, [selections, webPageData]);
    
      const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, checked } = event.target;
        setSelections((prevSelections) => ({
          ...prevSelections,
          [name]: checked,
        }));
      };
    
      const handleWebPageDataChange = (name: keyof WebPageData, value: number): void => {
        setWebPageData((prevWebPageData) => ({
          ...prevWebPageData,
          [name]: value,
        }));
      };
    
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

  return (
    <Container>
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
              Nombre de pàgines:
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
            </InputLabel>
            <InputLabel>
              Nombre d'idiomes:
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
    </Container>
  );
}

export default BudgetScreen;
