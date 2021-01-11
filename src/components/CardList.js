import React, { useContext } from 'react';

import Card from './Card';
import { StateContext } from '../contexts/StateContext';

export default function CardList() {
  const tickerData = useContext(StateContext);

  const cards = Object.keys(tickerData).map((tickerName) => {
    const { value, priceTrend } = tickerData[tickerName];
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
