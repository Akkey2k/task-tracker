import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import "./app.css"

export default class ProjecSelector extends Component {
    render() {
        const projectsData = [
            {
                id: 1,
                label: "WSO"
            },
            {
                id: 2,
                label: "TAYX"
            },
            {
                id: 3,
                label: "SIGMA"
            },
            {
                id: 4,
                label: "KLM"
            },
            {
                id: 5,
                label: "TASK-MNGR"
            }
        ];

        const projects = projectsData.map((item) => {
            return (
                <option key={item.id}>{item.label}</option>
            )
        });

        return (
            <div className="project-selector-wrapper">
                <h1>Привет,</h1>
                <h2>
                    выбери проект на сегодня
                </h2>
                <div className="form-group d-flex">
                    <select className="form-control">
                        {projects}
                    </select>
                    <Link to="/manager">
                        <button className="btn btn-primary ml-1">
                            Выбрать
                        </button>
                    </Link>
                </div>
            </div>
        )
    }
}