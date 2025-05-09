import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import '@fortawesome/fontawesome-svg-core/styles.css'; // 꼭 필요
import { config } from '@fortawesome/fontawesome-svg-core'; 
config.autoAddCss = false; //

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
);