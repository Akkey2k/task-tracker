import React, { Component } from 'react';

import AppHeader from '../app-header';
import AppCalendar from '../app-calendar';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form'

import './app.css';

export default class App extends Component {
  constructor(){
    super();

    this.state = {
      todoData: [
        { label: 'Drink Coffee', id: 1, important: false, done: false },
        { label: 'Make Awesome App', id: 2, important: false, done: false },
        { label: 'Have a lunch', id: 3, important: false, done: false },
      ],
      label: "",
      filterProp: "all",
    };

    this.createTodoDataItem = (label) => {
      const { todoData } = this.state;
      return {
        label, 
        id: todoData.length + 1,
        important: false,
        done: false,
      }
    };

    this.deleteListItem = (id) => {
      this.setState(({todoData}) => {
        const idx = todoData.findIndex((el) => el.id === id);

        const newTodoData = [
          ...todoData.slice(0, idx),
          ...todoData.slice(idx + 1)
        ]

        return {
          todoData: newTodoData
        }
      })
    };

    this.AddItem = (label) => {
      this.setState(({ todoData }) =>{
        const newTodoItem = this.createTodoDataItem(label);
        const newTodoData = [
          ...todoData,
          newTodoItem
        ]
        return {
          todoData: newTodoData
        }
      });
    };

    this.toggleProperty = (arr, id, propName) => {
      const idx = arr.findIndex((el) => el.id === id);
      const oldItem = arr[idx];
      const newItem = {...oldItem, [propName]: !oldItem[propName]}

      return [
        ...arr.slice(0, idx),
        newItem,
        ...arr.slice(idx + 1)
      ]
    };

    this.toggleDone = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.toggleProperty(todoData, id, "done")
        }
      });
    };

    this.toggleImportant = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.toggleProperty(todoData, id, "important")
        }
      });
    };

    this.searchInputChanged = (newLabel) => {
      this.setState(({ label }) => {
        return {
          label: newLabel
        }
      });
    };

    this.search = (visibleItems, label) => {
      const findedTodoItems = visibleItems.filter((el) => {
        return el.label.toLocaleLowerCase().includes(label.toLocaleLowerCase())
      });

      if(label){
        return findedTodoItems
      } else{
        return visibleItems
      }
    };

    this.filterChanged = (filter) => {
      this.setState(({ filterProp }) => {
        return {
          filterProp: filter
        }
      });
    };

    this.filterItems = (filter) => {
      const { todoData } = this.state;
      let filteredTodoItems = todoData.filter((el) => {
        if(filter === "done"){
          return el.done
        }
        else if(filter === "active"){
          return !el.done
        }
        else if(filter === "all"){
          return todoData
        }

        return []; // default
      });

      return filteredTodoItems
    };
  };

  render(){
    const { todoData, label, filterProp} = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    
    let visibleItems = this.filterItems(filterProp);
        visibleItems = this.search(visibleItems, label);

    return (
      <div className="app-wrapper">
        <AppCalendar/>

        <div className="todo-app">
          <AppHeader toDo={todoCount} done={doneCount} />
          <div className="top-panel d-flex">
            <SearchPanel onSearchTodoItem={(label) => this.searchInputChanged(label)}/>
            <ItemStatusFilter onFilterTodoItems={(filter) => this.filterChanged(filter)}/>
          </div>
    
          <TodoList 
            todos={visibleItems}
            onDeleted={(id) => this.deleteListItem(id)}
            onToggleDone={(id) => this.toggleDone(id)}
            onToggleImportant={(id) => this.toggleImportant(id)}
            />
          <ItemAddForm 
            onAddItem={(label) => this.AddItem(label)}
          />
        </div>
      </div>
    );
  }
};