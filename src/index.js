import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GbProvider } from "./GbContext/gbContext";


ReactDOM.render(
  <GbProvider>
    <App />
  </GbProvider>
  ,
  document.getElementById('root')
);

