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
        { label: 'Drink Coffee',
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor nisl quis lorem consectetur, non placerat odio cursus. Curabitur nunc dolor, tristique id orci at, cursus tempor augue. Vestibulum vitae congue mauris. Vivamus vitae felis quis tellus tincidunt pretium eu non dui. Nullam porta lectus ac risus placerat, non aliquam leo dapibus. Cras sit amet sapien feugiat, consectetur eros at, vulputate sapien. Pellentesque tincidunt velit lectus, cursus scelerisque lorem varius nec.",
          id: 1,
          important: false, 
          done: false, 
          dateCreate: [15, 4, 2021]
        },
        { label: 'Eat some cake',
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor nisl quis lorem consectetur, non placerat odio cursus. Curabitur nunc dolor, tristique id orci at, cursus tempor augue. Vestibulum vitae congue mauris. Vivamus vitae felis quis tellus tincidunt pretium eu non dui. Nullam porta lectus ac risus placerat, non aliquam leo dapibus. Cras sit amet sapien feugiat, consectetur eros at, vulputate sapien. Pellentesque tincidunt velit lectus, cursus scelerisque lorem varius nec.",
          id: 2,
          important: false, 
          done: false, 
          dateCreate: [15, 4, 2021]
        },
        { label: 'Drink Coffee again',
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor nisl quis lorem consectetur, non placerat odio cursus. Curabitur nunc dolor, tristique id orci at, cursus tempor augue. Vestibulum vitae congue mauris. Vivamus vitae felis quis tellus tincidunt pretium eu non dui. Nullam porta lectus ac risus placerat, non aliquam leo dapibus. Cras sit amet sapien feugiat, consectetur eros at, vulputate sapien. Pellentesque tincidunt velit lectus, cursus scelerisque lorem varius nec.",
          id: 3,
          important: false, 
          done: false, 
          dateCreate: [15, 4, 2021]
        },
      ],
      label: "",
      filterProp: "all",
      chosenDate: [new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()],
    };

    this.createTodoDataItem = (label, description) => {
      const { todoData, chosenDate } = this.state;
      return {
        label, 
        description,
        id: todoData.length + 1,
        important: false,
        done: false,
        dateCreate: chosenDate,
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

    this.AddItem = (label, description) => {
      this.setState(({ todoData }) =>{
        const newTodoItem = this.createTodoDataItem(label, description);
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

    this.filterItems = (visibleItems, filter) => {
      let filteredTodoItems = visibleItems.filter((el) => {
        if(filter === "done"){
          return el.done
        }
        else if(filter === "active"){
          return !el.done
        }
        else if(filter === "all"){
          return visibleItems
        }

        return []; // default
      });

      return filteredTodoItems
    };

    this.formatDate = (date) => {
      return [
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear(),
      ];
    };

    this.dateChange = (date) => {
      date = this.formatDate(date)

      this.setState({
        chosenDate: date
      });
    };

    this.findItemsByDate = (date) => {
      const { todoData } = this.state;
      let findedTodoItems = todoData.filter((el) => {
        for(let i in date){
          if(el.dateCreate[i] === date[i]){
            return true
          }
          else{
            return false
          }
        }

        return false;
      });

      return findedTodoItems
    };
  };

  render(){
    const { label, filterProp, chosenDate} = this.state;
    
    let visibleItems = this.findItemsByDate(chosenDate);
        visibleItems = this.filterItems(visibleItems, filterProp);
        visibleItems = this.search(visibleItems, label);

    const doneCount = visibleItems.filter((el) => el.done).length;
    const todoCount = visibleItems.length - doneCount;

    console.log(visibleItems);

    return (
      <div className="app-wrapper">
        <AppCalendar onChange={(date) => this.dateChange(date)}/>

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
            onAddItem={(label, description) => this.AddItem(label, description)}
          />
        </div>
      </div>
    );
  }
};