import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import "./app.css"

export default class ProjecSelector extends Component {
    render() {
        return (
            <div className="project-selector-wrapper">
                <h1>Привет,</h1>
                <h2>
                    выбери проект на сегодня
                </h2>
                <div class="form-group d-flex">
                    <select className="form-control">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    <Link to="/Manager">
                        <button className="btn btn-primary ml-1">
                            Выбрать
                        </button>
                    </Link>
                </div>
            </div>
        )
    }
}