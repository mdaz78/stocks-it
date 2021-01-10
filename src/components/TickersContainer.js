import React from 'react';

import CardList from './CardList';

import style from '../styles/TickersContainer.module.css';

export default function TickersContainer() {
  return (
    <div className={style.container}>
      <h1 className={style.header}>Stocks IT</h1>
      <input
        type="text"
        placeholder="Search for Ticker"
        className={style.searchBox}
      />
      <div className={style.cardListContainer}>
        <CardList />
      </div>
    </div>
  );
}
