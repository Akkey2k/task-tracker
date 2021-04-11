import React from 'react';
import ReactDOM from 'react-dom';

import ProjectSelector from './ProjectSelector/components/app/'
import Manager from './Manager/components/app'

import { BrowserRouter, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const StartPage = () => {
  const History = createBrowserHistory();

  return (
    <BrowserRouter history={History}>
        <Route exact path="/" component={ProjectSelector} />
        <Route path="/Manager" component={Manager} />
    </BrowserRouter>
  )
};

ReactDOM.render(<StartPage />,
  document.getElementById('root'));