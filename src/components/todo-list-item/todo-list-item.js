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
          onClick={ onToggleDone }
          title={label}>
          {label}
        </span>

        <button type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick={onToggleImportant}>
          <i className="fa fa-trash-o" />
        </button>

        <hr className="float-right" style={{height: "35px", width: "1px", margin: "0px 10px 0 10px" , backgroundColor: "rgba(0,0,0,.225)"}}/>

        <button type="button"
                className="btn btn-outline-primary btn-sm float-right"
                onClick={onDeleted}>
          <i className="fa fa-file" />
        </button>

        <button type="button"
                className="btn btn-outline-success btn-sm float-right"
                onClick={ onToggleImportant }>
          <i className="fa fa-exclamation" />
        </button>
      </span>
    );
  }
}
