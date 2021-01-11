import React, { useContext } from 'react';

import Card from './Card';
import { StateContext } from '../contexts/StateContext';

export default function CardList() {
  const { state } = useContext(StateContext);
  const { tickers } = state;
  const tickersData = { ...tickers };

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
