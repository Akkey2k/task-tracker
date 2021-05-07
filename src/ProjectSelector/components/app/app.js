import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import store from "store";

import "./app.css"

export default class ProjecSelector extends Component {
    constructor() {
        super();

        this.state = {
            projectsData: [],
            selectedProjectCode: "",
        };

        this.componentDidUpdate = () => {
            store.set("projectsData", this.state.projectsData);
        }

        this.componentDidMount = () => {
            const nowStore = store.get("projectsData");
            if (!nowStore) {
                store.set("projectsData",
                    [{
                        id: Date.now(),
                        projectLabel: "Твой первый проект",
                        projectCode: "project_" + Date.now()
                    }]
                );
            }

            if(!store.get("selectedProjectCode")){
                const projectCode = store.get("projectsData")[0].projectCode;
                store.set("selectedProjectCode", projectCode);
            }

            if(!store.get("selectedProjectLabel")){
                const projectLabel = store.get("projectsData")[0].projectLabel;
                store.set("selectedProjectLabel", projectLabel)
            }

            this.setState({
                selectedProjectCode: store.get("selectedProjectCode"),
                projectsData: store.get("projectsData")
            });
        };

        this.changeProject = () => {
            const projectCode = document.querySelector(".project-selector").value;
            store.set("selectedProjectCode", projectCode)
            
            const projectsData = store.get("projectsData")

            this.setState({
                selectedProjectCode: projectCode
            })

            for (const i in projectsData) {
                if(projectsData[i].projectCode === projectCode) {
                    store.set("selectedProjectLabel", projectsData[i].projectLabel)
                }
            }

        };

        this.addProject = () => {
            const input = document.querySelector(".new-project");

            if(input.value.length < 1){
                return;
            }

            const projectCode = "project_" + Date.now();

            this.setState(({projectsData}) => {
                const newProjectsData = [
                    ...projectsData,
                    {
                        id: Date.now(),
                        projectLabel: input.value,
                        projectCode: projectCode
                    }
                ]                

                input.value = "";

                return {
                    projectsData: newProjectsData
                }
            });
        };
    };

    render() {
        const { projectsData, selectedProjectCode } = this.state;

        const projects = projectsData.map((item) => {
            return (
                <option key={item.id} value={item.projectCode}>{item.projectLabel}</option>
            )
        });

        return (
            <div className="project-selector-wrapper">
                <h1>Привет,</h1>
                <h2>
                    выбери проект на сегодня
                </h2>
                <div className="form-group d-flex">
                    <select value={selectedProjectCode} className="form-control project-selector"
                            onChange={() => this.changeProject()}>
                        {projects}
                    </select>
                    <Link to={"/manager/" + selectedProjectCode}>
                        <button className="btn btn-primary ml-1">
                            Выбрать
                        </button>
                    </Link>
                </div>

                <h2 className="pt-5">
                    или создай новый
                </h2>
                <div className="form-group d-flex">
                    <input type="text" className="form-control new-project" placeholder="Введи название"/>
                    <button className="btn btn-primary ml-1"
                            onClick={() => this.addProject()}>
                        Создать
                    </button>
                </div>
            </div>
        )
    }
}