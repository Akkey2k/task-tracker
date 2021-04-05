import React, { Component } from "react";

import "./item-add-form.css"

export default class ItemAddForm extends Component {
    constructor(){
        super();

        this.state ={
            label: "",
            buttonDisabled: true,
        };

        this.onInputChange = (event) => {
            this.setState({
                label: event.target.value,
                buttonDisabled: false,
            });
        };

        this.onFormSubmit = (event) => {
            event.preventDefault();
            const { onAddItem } = this.props;
            const { label } = this.state;

            if(label){
                onAddItem(label);

                this.setState({
                    label: "",
                });
            } else{
                this.setState({
                    buttonDisabled: true,
                });
            }
        };
    }

    render(){
        const { label, buttonDisabled } = this.state;

        let buttonClassList = "btn btn-outline-secondary";
        
        if(buttonDisabled){
            buttonClassList += " disabled";
        }

        return (
            <form className="item-add-form" onSubmit={this.onFormSubmit}>
                <input type="text" 
                    className="form-control mb-1"
                    placeholder="Type new task name"
                    value={label}
                    onChange={this.onInputChange}/>
                <button className={buttonClassList}>
                    Add task
                </button>
            </form>
        )
    }
}