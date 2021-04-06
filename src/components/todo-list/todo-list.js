import React, { Component } from 'react';

import TodoListItem from '../todo-list-item';
import './todo-list.css';

export default class TodoList extends Component {
  constructor(){
    super();

    this.state = {

    };
  };

  render() {
    const { todos, onDeleted, onToggleDone, onToggleImportant, onShowDetails } = this.props;

    const elements = todos.map((item) => {
      const { id, ...itemProps } = item;
  
      return (
        <li key={id} className="list-group-item">
          <TodoListItem
            {...itemProps } 
            onDeleted = {() => onDeleted(id)}
            onToggleDone = {() => onToggleDone(id)}
            onToggleImportant = {() => onToggleImportant(id)}
            onShowDetails = {() => onShowDetails(id)}
          />
        </li>
      );
    });
  
    return (
      <ul className="list-group todo-list">
        { elements }
      </ul>
    );
  };

};
