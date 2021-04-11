import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import "./app.css"

export default class ProjecSelector extends Component {
    render() {
        return (
            <div>
                <h1>Привет</h1>
                <h2>
                    Выбери проект на сегодня
                </h2>
                <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <button>
                    <Link to="/Manager">Выбрать</Link>
                </button>
            </div>
        )
    }
}