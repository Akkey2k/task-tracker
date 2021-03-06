import React, { Component } from "react";

import "./item-add-form.css"

export default class ItemAddForm extends Component {
    constructor() {
        super();

        this.state = {
            label: "",
            time: "",
            description: "",
            buttonDisabled: true,
        };

        this.onInputChange = (event) => {
            this.setState({
                label: event.target.value,
                buttonDisabled: false,
            });
        };

        this.onTimeInputChange = (event) => {
            if(!isNaN(event.target.value - 0)){
                this.setState({
                    time: Number(event.target.value),
                    buttonDisabled: false,
                });
            } else{
                this.setState({
                    time: 0,
                    buttonDisabled: false,
                });
            }
        };

        this.onTextAreaChange = (event) => {
            this.setState({
                description: event.target.value,
                buttonDisabled: false,
            });
        };

        this.onFormSubmit = (event) => {
            event.preventDefault();
            const { onAddItem } = this.props;
            const { label, time, description } = this.state;

            const chekedTime = time ? time : 0;

            if (label) {
                onAddItem(label, chekedTime, description);

                this.setState({
                    label: "",
                    time: "",
                    description: "",
                });
            } else {
                this.setState({
                    buttonDisabled: true,
                });
            }
        };
    }

    render() {
        const { label, time, description, buttonDisabled } = this.state;

        let buttonClassList = "btn btn-outline-secondary";

        if (buttonDisabled) {
            buttonClassList += " disabled";
        }

        return (
            <form className="item-add-form" onSubmit={this.onFormSubmit}>
                <div className="input-group">
                    <input type="text"
                        className="form-control mb-1"
                        placeholder="Type new task title"
                        value={label}
                        onChange={this.onInputChange} />
                    <input type="text"
                        className="form-control mb-1"
                        placeholder="Time"
                        value={time}
                        onChange={this.onTimeInputChange} />
                </div>
                <textarea type="text"
                    className="form-control mb-1"
                    placeholder="Type description"
                    value={description}
                    onChange={this.onTextAreaChange} />
                <button className={buttonClassList}>
                    Add task
                </button>
            </form>
        )
    }
}