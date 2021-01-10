import React from 'react';

import TickersContainer from './TickersContainer';
import GraphContainer from './GraphContainer';

import style from '../styles/App.module.css';

export default function App() {
  return (
    <div className={style.containerFluid}>
      <div className={style.tickersContainer}>
        <TickersContainer />
      </div>
      <div className={style.graphContainer}>
        <GraphContainer />
      </div>
    </div>
  );
}
