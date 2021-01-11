import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import style from '../styles/Card.module.css';

export default function Card({ name, ticker, onClick }) {
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

  function getTrend(prices) {
    if (prices.length <= 1) {
      return 'STABLE';
    }

    const closingPrice = prices[prices.length - 1];
    const openingPrice = prices[prices.length - 2];

    if (closingPrice > openingPrice) {
      return 'INCREASING';
    }

    if (closingPrice < openingPrice) {
      return 'DECREASING';
    }
    return 'STABLE';
  }

  function getTimeElapsed(times) {
    if (times.length <= 1) {
      return '0 seconds ago';
    }

    const lastTimeElapsed = moment(times[times.length - 1], 'HH:mm:ss a');
    const secondLastTimeElapsed = moment(times[times.length - 2], 'HH:mm:ss a');

    // const seconds = lastTimeElapsed.diff(secondLastTimeElapsed, 'seconds');
    const duration = moment.duration(
      lastTimeElapsed.diff(secondLastTimeElapsed)
    );

    return `${duration.asSeconds()} seconds ago`;
  }

  function getDerivedData() {
    const { prices, times } = ticker;

    const value = prices[prices.length - 1];
    const trend = getTrend(prices);
    const timeElapsed = getTimeElapsed(times);

    return { value, trend, timeElapsed };
  }

  const { value, trend, timeElapsed } = getDerivedData();
  const [icon, boxColor] = getBoxClassName(trend);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div className={style.cardContainer} onClick={() => onClick()}>
      <div className={style.tickerSide}>
        <h3>{name.toUpperCase()}</h3>
        <p>{timeElapsed}</p>
      </div>
      <div className={style.valueSide}>
        <div className={boxColor}>
          <i className={icon} />
          <p>{`$ ${value}`}</p>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  ticker: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
};
