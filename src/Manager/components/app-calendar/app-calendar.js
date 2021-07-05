import React, { Component } from 'react';
import Calendar from 'react-calendar';
import AppExportCSV from '../app-export';
import Button from 'react-bootstrap/Button';
import store from "store";

import 'react-calendar/dist/Calendar.css';
import './app-calendar.css';

export default class AppCalendar extends Component {
    constructor() {
        super();

        this.state = {
            value: new Date(),
            exportData: store.get("todoData")
        }

        this.getExportData = (clickedDate) => {
            const date = [clickedDate.getDate(), clickedDate.getMonth() + 1, clickedDate.getFullYear()] 
            const dataStore = store.get("todoData");

            let currentData = [];

            for (const data of dataStore) {
                if(data.dateCreate[0] >= date[0] && data.dateCreate[1] >= date[1] && data.dateCreate[2] >= date[2]){
                    if(data.projectCode === store.get("selectedProjectCode")){
                        currentData.push(data);
                    }
                }
            }

            let correctData = [];

            for (const data of currentData) {
                correctData.push({
                    "Название": data.label,
                    "Время": data.time,
                    "Описание": data.description,
                    "Дата": data.dateCreate[0] + "." + data.dateCreate[1] + "." + data.dateCreate[2]
                });
            }

            return correctData;
        }

        this.onChange = (value) => {
            this.setState({
                value,
                exportData: this.getExportData(value)
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

        this.copyToClipboard = () => {
            const str = JSON.stringify(this.getExportData(this.state.value));
            const el = document.createElement('textarea');
            el.value = str;
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        }
    }

    render() {
        const { value, exportData } = this.state;

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
                <AppExportCSV csvData={exportData} fileName="Jira Hours"/>
                <Button variant="primary" className="mt-3" style={{width: 20 + "%"}} onClick={this.copyToClipboard}>Copy</Button>
            </div>
        );
    }
};