import React, { Component } from 'react';
import Calendar from 'react-calendar';

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
    }

    render() {
        const { value } = this.state;

        return (
            <div className="app-calendar">
              <Calendar
                onClickDay={(value)=> this.onChange(value)}
                value={value}
              />
            </div>
          );
    }
};