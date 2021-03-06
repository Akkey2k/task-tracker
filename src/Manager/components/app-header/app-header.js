import React from 'react';

import { Link } from 'react-router-dom';
import store from "store";

import './app-header.css';

const AppHeader = ({toDo, done}) => {
  return (
    <div className="app-header d-flex">
      <Link to="/" className="app-header-title">
        <span className="fa fa-chevron-left"></span>
        <h1>{store.get("selectedProjectLabel")}</h1>
      </Link>
      <h2>{toDo} more to do, {done} done</h2>
    </div>
  );
};

export default AppHeader;
