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
                if (JSON.stringify(todoData[todo].dateCreate) === JSON.stringify(calendarDate)) {
                    currentDayTodos.push(todoData[todo]);
                }
            }

            for (let data in todoData) {
                if (currentDayTodos.length > 0 && todoData[data].projectCode === selectedProjectCode && JSON.stringify(todoData[data].dateCreate) === JSON.stringify(calendarDate)) {
                    if (!todoData[data].done) {
                        return "day-has-unfinished-todo"
                    } else {
                        return "day-has-todo"
                    }
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