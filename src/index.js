import React from 'react';
import ReactDOM from 'react-dom';

import ProjectSelector from './ProjectSelector/components/app/'
import Manager from './Manager/components/app'

import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const StartPage = () => {
  const History = createBrowserHistory();

  return (
    <Router history={History}>
        <Route exact path="/" component={ProjectSelector} />
        <Route path="/manager" component={Manager} />
    </Router>
  )
};

ReactDOM.render(<StartPage />,
  document.getElementById('root'));