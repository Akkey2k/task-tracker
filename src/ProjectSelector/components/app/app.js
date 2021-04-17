import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import "./app.css"

export default class ProjecSelector extends Component {
    constructor() {
        super();

        this.state = {
            selectedProject: "WSO",
            projectsData: [
                {
                    id: 1,
                    projectCode: "WSO"
                },
                {
                    id: 2,
                    projectCode: "TAYX"
                },
                {
                    id: 3,
                    projectCode: "SIGMA"
                },
                {
                    id: 4,
                    projectCode: "KLM"
                },
                {
                    id: 5,
                    projectCode: "TASK-MNGR"
                }
            ],
        };

        this.changeProject = () => {
            const projectCode = document.querySelector(".project-selector").value;
            this.setState({
                selectedProject: projectCode
            });
        };
    };

    render() {
        const { projectsData, selectedProject } = this.state;

        const projects = projectsData.map((item) => {
            return (
                <option key={item.id} value={item.projectCode}>{item.projectCode}</option>
            )
        });

        return (
            <div className="project-selector-wrapper">
                <h1>Привет,</h1>
                <h2>
                    выбери проект на сегодня
                </h2>
                <div className="form-group d-flex">
                    <select className="form-control project-selector"
                            onChange={() => this.changeProject()}>
                        {projects}
                    </select>
                    <Link to={"/manager/" + selectedProject}>
                        <button className="btn btn-primary ml-1">
                            Выбрать
                        </button>
                    </Link>
                </div>
            </div>
        )
    }
}