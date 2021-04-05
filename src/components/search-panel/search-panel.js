import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {
  constructor(){
    super();

    this.changeSearchInput = (event) => {
      const { onSearchTodoItem } = this.props;
      onSearchTodoItem(event.target.value);
    };
  };


  render(){
    return (
      <input type="text"
          className="form-control search-input"
          placeholder="type to search"
          onChange={this.changeSearchInput}/>
    );
  }
};
