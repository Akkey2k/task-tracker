import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component{
  constructor(){
    super();

    this.filterClickHandler = (filterProp) => {
      return ( event ) => {
        const button = event.target;
        const siblings = document.querySelectorAll(".btn-group .btn");

        siblings.forEach((item) => {
          item.className = "btn btn-outline-secondary";
        });

        button.className = "btn btn-info";
        
        const { onFilterTodoItems } = this.props;
        onFilterTodoItems(filterProp)
      }

    };
  };

  render(){
    return (
      <div className="btn-group">
        <button type="button"
                className="btn btn-info" onClick={this.filterClickHandler("all")}>All</button>
        <button type="button"
                className="btn btn-outline-secondary" onClick={this.filterClickHandler("active")}>Active</button>
        <button type="button"
                className="btn btn-outline-secondary" onClick={this.filterClickHandler("done")}>Done</button>
      </div>
    );
  }
}