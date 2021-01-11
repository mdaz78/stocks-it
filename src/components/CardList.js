import React, { useContext } from 'react';

import Card from './Card';
import { StateContext } from '../contexts/StateContext';

export default function CardList() {
  const { tickersData } = useContext(StateContext);

  const cards = Object.keys(tickersData).map((tickerName) => {
    const { value, priceTrend } = tickersData[tickerName];
    return (
      <Card
        value={value}
        name={tickerName}
        priceTrend={priceTrend}
        key={tickerName}
      />
    );
  });

  return <div>{cards}</div>;
}
