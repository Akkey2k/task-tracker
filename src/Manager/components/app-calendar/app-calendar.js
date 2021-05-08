import React, { Component } from 'react';
import Calendar from 'react-calendar';
import store from "store";

import 'react-calendar/dist/Calendar.css';
import './app-calendar.css';

export default class AppCalendar extends Component {
    constructor(){
        super();
        
        this.state = {
            value: new Date(),
        }

        this.onChange = (value) =>{
            this.setState({
                value
            });

            const { onChange } = this.props;
            onChange(value);
        }

        this.tileClassName = (date) => {
            date = date.date;
            
            const todoData = store.get("todoData");
            const selectedProjectCode = store.get("selectedProjectCode");
            const calendarDate = [date.getDate(), date.getMonth() + 1, date.getFullYear()];

            for (const date in todoData) {
                if(todoData[date].projectCode === selectedProjectCode && JSON.stringify(todoData[date].dateCreate) === JSON.stringify(calendarDate)){
                    return "day-has-todo"
                }
            }
        }
    }

    render() {
        const { value } = this.state;

        return (
            <div className="app-calendar">
              <Calendar
                tileClassName={(date) => this.tileClassName(date)}
                onClickDay={(value)=> this.onChange(value)}
                value={value}
              />
            </div>
          );
    }
};