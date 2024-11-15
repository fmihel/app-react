import redux from 'REDUX';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './actions';
import './index.scss';
import App from './App.jsx';


redux.on(() => {
    console.log('change state', redux.getState());
});

createRoot(document.getElementById('root')).render(<Provider store={redux.store}><App /></Provider>);
