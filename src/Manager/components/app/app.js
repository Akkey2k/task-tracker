import React, { Component } from 'react';

import AppHeader from '../app-header';
import AppCalendar from '../app-calendar';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';
import AppDetails from '../app-details';

import store from "store";

import './app.css';

export default class App extends Component {
  constructor(){
    super();

    this.state = {
      todoData: [],
      label: "",
      filterProp: "all",
      chosenDate: [new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()],
      detailsId: null,
      isVisibleDetails: false,
    };

    this.componentDidUpdate = () => {
      store.set("todoData", this.state.todoData);
    }

    this.componentDidMount = () => {
      const projectCode = this.props.match.params.projectCode;

      const nowStore = store.get("todoData");
      if(!nowStore){
        store.set("todoData", 
          [{  
            label: 'Первая задача, тыкни на меня',
            time: 0,
            description: "Попробуйте добавить новые задачи на сегодня",
            id: 1,
            projectCode: projectCode,
            important: false, 
            done: false, 
            dateCreate: [new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()]
          }]
        );
      }

      this.setState({
        todoData: store.get("todoData")
      });
    };

    this.createTodoDataItem = (label, time, description, projectCode) => {
      const { chosenDate } = this.state;
      return {
        label, 
        time,
        description,
        id: Date.now(),
        projectCode,
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

    this.AddItem = (label, time, description, projectCode) => {
      this.setState(({ todoData }) =>{
        const newTodoItem = this.createTodoDataItem(label, time, description, projectCode);
        const newTodoData = [
          ...todoData,
          newTodoItem
        ];

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

    this.findItemsByDate = (visibleItems, date) => {
      let findedTodoItems = visibleItems.filter((el) => {
        if(JSON.stringify(el.dateCreate) === JSON.stringify(date)){
          return true
        }
        else{
          return false
        }

        return false;
      });

      return findedTodoItems
    };

    this.findItemsByProjectCode = (code) => {
      const { todoData } = this.state;
      let findedTodoItems = todoData.filter((el) => {
        if(el.projectCode === code){
          return true
        }
        else{
          return false
        }
      });
      return findedTodoItems
    };

    this.setDetailsId = (id) => {
      this.setState({
        detailsId: id,
        isVisibleDetails: true
      });
    };

    this.hideDetails = () => {
      this.setState({
        isVisibleDetails: false
      });
    };

    this.todoChange = (detailsId, newLabel, newTime, newDescription) => {
      this.setState(({ todoData }) =>{
        const idx = todoData.findIndex((el) => el.id === detailsId);
        const oldItem = todoData[idx];
        const newItem = {...oldItem, label: newLabel, time: newTime, description: newDescription}

        const newTodoData = [
          ...todoData.slice(0, idx),
          newItem,
          ...todoData.slice(idx + 1)
        ]

        return {
          todoData: newTodoData
        }
      });

    };
  };

  render(){
    const { label, filterProp, chosenDate, detailsId, isVisibleDetails } = this.state;
    const { projectCode } = this.props.match.params;
    
    // Фильтрация данных для показа
    let visibleItems = this.findItemsByProjectCode(projectCode);
        visibleItems = this.findItemsByDate(visibleItems, chosenDate);
        visibleItems = this.filterItems(visibleItems, filterProp);
        visibleItems = this.search(visibleItems, label);

    // Счетчики more to do\done задач
    const doneCount = visibleItems.filter((el) => el.done).length;
    const todoCount = visibleItems.length - doneCount;
    const totalHours = visibleItems.length !== 0 
        ? visibleItems.map((current) => {
            return current.time;
        }).reduce((prev, current) => {
            return prev + current;
        })
        : 0;

    return (
      <div className="app-wrapper">
        <AppCalendar onChange={(date) => this.dateChange(date)}/>

        <div className="todo-app">
          <AppHeader toDo={ todoCount } done={ doneCount } />
          <h6 style={{textAlign: "right"}}>Total hours: {totalHours}</h6>
          <div className="top-panel d-flex">
            <SearchPanel onSearchTodoItem={(label) => this.searchInputChanged(label)}/>
            <ItemStatusFilter onFilterTodoItems={(filter) => this.filterChanged(filter)}/>
          </div>
    
          <TodoList 
            todos={visibleItems}
            onDeleted={(id) => this.deleteListItem(id)}
            onToggleDone={(id) => this.toggleDone(id)}
            onToggleImportant={(id) => this.toggleImportant(id)}
            onShowDetails={(id) => this.setDetailsId(id)}
            />
          <ItemAddForm 
            onAddItem={(label, time, description) => this.AddItem(label, time, description, projectCode)}
          />
        </div>

        <AppDetails 
          visibleItems={ visibleItems } 
          detailsId={ detailsId } 
          isVisible = { isVisibleDetails }
          onHideDetails={ () => this.hideDetails()}
          onTodoChange={(detailsId, newLabel, newTime, newDescription) => this.todoChange(detailsId, newLabel, newTime, newDescription)}
          />
      </div>
    );
  }
};