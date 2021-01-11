import React from 'react';
import PropTypes from 'prop-types';

import style from '../styles/Card.module.css';

export default function Card({ value, name, priceTrend }) {
  function getBoxClassName(trend) {
    switch (trend) {
      case 'INCREASING':
        return ['fas fa-chevron-up', style.greenBox];

      case 'DECREASING':
        return ['fas fa-chevron-down', style.redBox];

      default:
        return ['fas fa-minus', style.greyBox];
    }
  }

  const [icon, boxColor] = getBoxClassName(priceTrend);

  return (
    <div className={style.cardContainer}>
      <div className={style.tickerSide}>
        <h3>{name.toUpperCase()}</h3>
        <p>Opening Value</p>
      </div>
      <div className={style.valueSide}>
        <div className={boxColor}>
          <i className={icon} />
          <p>{`$ ${value.toFixed(2)}`}</p>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  priceTrend: PropTypes.string.isRequired,
};
