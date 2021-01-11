import React, { useRef, useState, useEffect } from 'react';

import TickersContainer from './TickersContainer';
import GraphContainer from './GraphContainer';

import style from '../styles/App.module.css';
import { StateContext } from '../contexts/StateContext';

export default function App() {
  const [webSocketResponse, setWebSocketResponse] = useState([]);
  const [tickersData, setTickersData] = useState({});

  const webSocket = useRef(null);

  useEffect(() => {
    webSocket.current = new WebSocket('ws://stocks.mnet.website');
    webSocket.current.onmessage = (message) => {
      setWebSocketResponse(JSON.parse(message.data));
    };

    return () => webSocket.current.close();
  }, []);

  useEffect(() => {
    const copyOfTickersData = { ...tickersData };

    webSocketResponse.forEach(([name, price]) => {
      if (name in copyOfTickersData) {
        const history = [...copyOfTickersData[name].history];
        const receivedAt = Date.now();
        const prevValue = copyOfTickersData[name].value;

        copyOfTickersData[name] = {
          value: Number(price),
          priceTrend: prevValue < price ? 'INCREASING' : 'DECREASING',
          receivedAt,
          history: [...history, [receivedAt, price]],
        };
      } else {
        const receivedAt = Date.now();

        copyOfTickersData[name] = {
          tickerName: name,
          value: Number(price),
          priceTrend: 'STABLE',
          receivedAt,
          history: [[receivedAt, price]],
        };
      }
    });

    setTickersData(copyOfTickersData);
  }, [webSocketResponse]);

  return (
    <StateContext.Provider value={tickersData}>
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
