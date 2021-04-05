import React, { Component } from "react";

import "./item-add-form.css"

export default class ItemAddForm extends Component {
    constructor(){
        super();

        this.state ={
            label: "",
            description: "",
            buttonDisabled: true,
        };

        this.onInputChange = (event) => {
            this.setState({
                label: event.target.value,
                buttonDisabled: false,
            });
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
            const { label, description } = this.state;

            if(label){
                onAddItem(label, description);

                this.setState({
                    label: "",
                    description: "",
                });
            } else{
                this.setState({
                    buttonDisabled: true,
                });
            }
        };
    }

    render(){
        const { label, description, buttonDisabled } = this.state;

        let buttonClassList = "btn btn-outline-secondary";
        
        if(buttonDisabled){
            buttonClassList += " disabled";
        }

        return (
            <form className="item-add-form" onSubmit={this.onFormSubmit}>
                <input type="text" 
                    className="form-control mb-1"
                    placeholder="Type new task title"
                    value={label}
                    onChange={this.onInputChange}/>
                <textarea type="text" 
                    className="form-control mb-1"
                    placeholder="Type description"
                    value={description}
                    onChange={this.onTextAreaChange}/>
                <button className={buttonClassList}>
                    Add task
                </button>
            </form>
        )
    }
}