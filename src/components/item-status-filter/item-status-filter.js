import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component{
  render(){
    const { onFilterTodoItems } = this.props;

    return (
      <div className="btn-group">
        <button type="button"
                className="btn btn-info" onClick={() => onFilterTodoItems("all")}>All</button>
        <button type="button"
                className="btn btn-outline-secondary" onClick={() => onFilterTodoItems("active")}>Active</button>
        <button type="button"
                className="btn btn-outline-secondary" onClick={() => onFilterTodoItems("done")}>Done</button>
      </div>
    );
  }
}