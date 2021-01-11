/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

export default function GraphContainer({ ticker, data }) {
  if (!ticker) {
    return null;
  }

  const redraw = ticker.prices.length > 1;
  return <Line data={data} redraw={redraw} />;
}

GraphContainer.propTypes = {
  ticker: PropTypes.any.isRequired,
  // tickers: PropTypes.any.isRequired,
  data: PropTypes.any.isRequired,
  // name: PropTypes.string.isRequired,
};
