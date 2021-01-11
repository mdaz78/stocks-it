import React, { useRef, useState, useEffect } from 'react';

import TickersContainer from './TickersContainer';
import GraphContainer from './GraphContainer';

import style from '../styles/App.module.css';
import { StateContext } from '../contexts/StateContext';

export default function App() {
  const [state, setState] = useState({
    tickers: {},
    selectedTicker: '',
  });

  const webSocket = useRef(null);

  useEffect(() => {
    const copyOfState = { ...state };
    const { tickers } = { ...copyOfState };
    let { selectedTicker } = { ...copyOfState };

    webSocket.current = new WebSocket('ws://stocks.mnet.website');
    webSocket.current.onmessage = (message) => {
      const data = JSON.parse(message.data);
      data.forEach(([name, price]) => {
        if (tickers[name]) {
          tickers[name].prices.push(Number(price.toFixed(2)));
          tickers[name].times.push(new Date());
        } else {
          tickers[name] = {};
          tickers[name].prices = [Number(price.toFixed(2))];
          tickers[name].times = [new Date()];
          selectedTicker = selectedTicker || name;
        }
      });
      setState({ ...state, tickers, selectedTicker });
    };

    return () => webSocket.current.close();
  }, []);

  return (
    <StateContext.Provider value={{ state }}>
      <div className={style.containerFluid}>
        <div className={style.tickersContainer}>
          <TickersContainer />
        </div>
        <div className={style.graphContainer}>
          <GraphContainer />
        </div>
      </div>
    </StateContext.Provider>
  );
}
