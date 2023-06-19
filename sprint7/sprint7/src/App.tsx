import React, { useState } from 'react';

interface Selections {
  webPage: boolean;
  seoCampaign: boolean;
  adCampaign: boolean;
}

const prices: Record<keyof Selections, number> = {
  webPage: 500,
  seoCampaign: 300,
  adCampaign: 200,
};

function App(): JSX.Element {
  const [selections, setSelections] = useState<Selections>({
    webPage: false,
    seoCampaign: false,
    adCampaign: false,
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = event.target;
    setSelections((prevSelections) => ({
      ...prevSelections,
      [name]: checked,
    }));
  };

  const totalBudget: number = Object.keys(selections).reduce((total, key) => {
    if (selections[key as keyof Selections]) {
      return total + prices[key as keyof Selections];
    }
    return total;
  }, 0);

  return (
    <div>
      <h1>Pressupost</h1>
      <label>
        <input
          type="checkbox"
          name="webPage"
          checked={selections.webPage}
          onChange={handleCheckboxChange}
        />
        Pàgina web (500 €)
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="seoCampaign"
          checked={selections.seoCampaign}
          onChange={handleCheckboxChange}
        />
        Consultoria SEO (300 €)
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="adCampaign"
          checked={selections.adCampaign}
          onChange={handleCheckboxChange}
        />
        Campanya de Google Ads (200 €)
      </label>
      <br />
      <h2>Pressupost total: {totalBudget} €</h2>
    </div>
  );
}

export default App;
