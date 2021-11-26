import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import './bootstrap.css'
import './style.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

ReactDOM.render(
  <React.StrictMode>
    <Routes/>
  </React.StrictMode>,
  document.getElementById('root')
);