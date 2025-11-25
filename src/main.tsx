import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

const ROOT_ID = 'mobile-bottom-bar-root';

function resolveRoot() {
  const existing = document.getElementById(ROOT_ID);
  if (existing) {
    return existing;
  }

  const mountPoint = document.createElement('div');
  mountPoint.id = ROOT_ID;
  document.body.appendChild(mountPoint);
  return mountPoint;
}

ReactDOM.createRoot(resolveRoot()).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
