import React from 'react';
import ReactDOM from 'react-dom';
import './static/sass/index.scss';
import Main from './layout/Main';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>,
  document.getElementById('root')
);
