import React, { useRef, useState, useEffect } from 'react';
import moment from 'moment';

import TickersContainer from './TickersContainer';
import GraphContainer from './GraphContainer';
import Loader from './Loader';

import style from '../styles/App.module.css';
import { StateContext } from '../contexts/StateContext';

export default function App() {
  const [websocketResponse, setWebsocketResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    tickers: {},
    selectedTicker: '',
    graphData: {},
  });

  const webSocket = useRef(null);

  useEffect(() => {
    webSocket.current = new WebSocket('ws://stocks.mnet.website');
    webSocket.current.onmessage = (message) => {
      setLoading(false);
      setWebsocketResponse(JSON.parse(message.data));
    };

    return () => webSocket.current.close();
  }, []);

  useEffect(() => {
    const copyOfState = { ...state };
    const { tickers } = { ...copyOfState };

    websocketResponse.forEach(([name, price]) => {
      // update selectedTicker
      if (!copyOfState.selectedTicker) {
        copyOfState.selectedTicker = name;
      }

      // update tickers
      if (tickers[name]) {
        tickers[name].prices.push(Number(price.toFixed(2)));
        tickers[name].times.push(moment().format('h:mm:ss a'));
      } else {
        tickers[name] = {};
        tickers[name].prices = [Number(price.toFixed(2))];
        tickers[name].times = [moment().format('h:mm:ss a')];
      }
    });

    setState({ ...state, ...copyOfState });
  }, [websocketResponse]);

  const updateSelectedTicker = (tickerName) => {
    setState({ ...state, selectedTicker: tickerName });
  };

  const getUpdatedData = () => {
    const { tickers, selectedTicker } = state;
    if (tickers[selectedTicker]) {
      return {
        labels: tickers[selectedTicker].times,
        datasets: [
          {
            label: selectedTicker.toUpperCase(),
            data: tickers[selectedTicker].prices,
            fill: true,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,0.2)',
          },
        ],
      };
    }
    return {};
  };
  const updatedData = getUpdatedData();

  if (loading) {
    return <Loader />;
  }

  return (
    <StateContext.Provider value={{ state, updateSelectedTicker }}>
      <div className={style.containerFluid}>
        <div className={style.tickersContainer}>
          <TickersContainer />
        </div>
        <div className={style.graphContainer}>
          <GraphContainer
            ticker={state.tickers[state.selectedTicker]}
            data={updatedData}
          />
        </div>
      </div>
    </StateContext.Provider>
  );
}
