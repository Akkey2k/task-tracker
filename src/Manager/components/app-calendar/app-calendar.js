import React, { Component } from 'react';
import Calendar from 'react-calendar';
import store from "store";

import 'react-calendar/dist/Calendar.css';
import './app-calendar.css';

export default class AppCalendar extends Component {
    constructor() {
        super();

        this.state = {
            value: new Date(),
        }

        this.onChange = (value) => {
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

            let currentDayTodos = [];

            for (let todo in todoData) {
                if (JSON.stringify(todoData[todo].dateCreate) === JSON.stringify(calendarDate) && todoData[todo].projectCode === selectedProjectCode) {
                    currentDayTodos.push(todoData[todo]);
                }
            }

            let currentDayDoneTodos = [];

            for (let data in currentDayTodos) {
                if (currentDayTodos[data].projectCode === selectedProjectCode) {
                    for (let i = 0; i < currentDayTodos.length; i++) {
                        if (!currentDayTodos[data].done) {
                            currentDayDoneTodos.push(currentDayTodos[data]);
                        }
                    }
                }
            }

            if(currentDayDoneTodos.length > 0){
                return "day-has-unfinished-todo"
            } else if (currentDayTodos.length > 0) {
                return "day-has-todo"
            } 
        }
    }

    render() {
        const { value } = this.state;

        return (
            <div className="app-calendar">
                <Calendar
                    tileClassName={(date) => this.tileClassName(date)}
                    onClickDay={(value) => this.onChange(value)}
                    value={value}
                />
                <div className="app-calendar-legend-map-wrapper">
                    <div className="app-calendar-legend-map app-calendar-legend-map_has-todo">
                        <i></i>
                        <span>Все задачи выполнены</span>
                    </div>
                    <div className="app-calendar-legend-map app-calendar-legend-map_has-unfinished-todo">
                        <i></i>
                        <span>Не все задачи выполнены</span>
                    </div>
                    <div className="app-calendar-legend-map app-calendar-legend-map_has-chosen-day">
                        <i></i>
                        <span>Выбранный день</span>
                    </div>
                </div>
            </div>
        );
    }
};