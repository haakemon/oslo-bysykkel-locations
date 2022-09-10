import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'src/app';
import 'src/index.css';

// Enable this to mock queries to get stations
// if (process.env.NODE_ENV === 'development') {
//   const { worker } = await import('./mocks/browser');
//   worker.start({
//     onUnhandledRequest: 'bypass',
//   });
// }

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
