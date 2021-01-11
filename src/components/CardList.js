import React, { useContext } from 'react';

import Card from './Card';
import { StateContext } from '../contexts/StateContext';

export default function CardList() {
  const { state } = useContext(StateContext);
  const { tickers } = { ...state };
  const tickersData = { ...tickers };

  if (!tickersData) {
    return null;
  }

  const cards = Object.keys(tickersData).map((tickerName) => {
    const ticker = tickersData[tickerName];
    return <Card ticker={ticker} name={tickerName} key={tickerName} />;
  });

  return <div>{cards}</div>;
}
