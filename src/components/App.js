import React, { useRef, useState, useEffect } from 'react';

import TickersContainer from './TickersContainer';
import GraphContainer from './GraphContainer';

import style from '../styles/App.module.css';
import { StateContext } from '../contexts/StateContext';

export default function App() {
  const [webSocketResponse, setWebSocketResponse] = useState([]);
  const [state, setState] = useState({
    tickers: {},
    selectedTicker: {},
  });

  const webSocket = useRef(null);

  useEffect(() => {
    webSocket.current = new WebSocket('ws://stocks.mnet.website');
    webSocket.current.onmessage = (message) => {
      setWebSocketResponse(JSON.parse(message.data));
    };

    return () => webSocket.current.close();
  }, []);

  useEffect(() => {
    const copyOfState = { ...state };
    const tickers = { ...copyOfState.tickers };

    webSocketResponse.forEach(([name, price]) => {
      if (name in tickers) {
        const history = [...tickers[name].history];
        const receivedAt = Date.now();
        const prevValue = tickers[name].value;

        tickers[name] = {
          value: Number(price),
          priceTrend: prevValue < price ? 'INCREASING' : 'DECREASING',
          receivedAt,
          history: [...history, [receivedAt, price]],
        };
      } else {
        const receivedAt = Date.now();

        tickers[name] = {
          tickerName: name,
          value: Number(price),
          priceTrend: 'STABLE',
          receivedAt,
          history: [[receivedAt, price]],
        };
      }
    });

    setState({ ...state, tickers });
  }, [webSocketResponse]);

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
