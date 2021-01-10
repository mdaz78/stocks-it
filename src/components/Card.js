import React from 'react';

import style from '../styles/Card.module.css';

export default function Card() {
  return (
    <div className={style.cardContainer}>
      <div className={style.tickerSide}>
        <h3>AAPL</h3>
        <p>Opening Value</p>
      </div>
      <div className={style.valueSide}>
        <div className={style.greenBox}>
          <i className="fas fa-chevron-up" />
          <p>$ 116.00</p>
        </div>
      </div>
    </div>
  );
}
