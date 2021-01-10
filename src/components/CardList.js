import React from 'react';

import Card from './Card';

export default function CardList() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const cards = arr.map(() => <Card />);
  return <div>{cards}</div>;
}
