import React, { Component } from 'react';

import './todo-list-item.css';

export default class TodoListItem extends Component{
  render(){
    const { label, done, important, onDeleted, onToggleDone, onToggleImportant } = this.props;

    let classList = "todo-list-item";
    
    if(done) classList += " done";

    if(important) classList += " important";

    return (
      <span className={classList}>
        <span
          className="todo-list-item-label"
          onClick={ onToggleDone }>
          {label}
        </span>
  
        <button type="button"
                className="btn btn-outline-success btn-sm float-right"
                onClick={ onToggleImportant }>
          <i className="fa fa-exclamation" />
        </button>
  
        <button type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick={onDeleted}>
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  }
}
