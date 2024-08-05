import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import add from '@/test'
const total =  add(1,4)
console.log(total)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <App />

);

