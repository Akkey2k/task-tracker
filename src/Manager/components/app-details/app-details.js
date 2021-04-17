import React, { Component } from "react";

import "./app-details.css";

export default class AppDetails extends Component {
    constructor(){
        super();

        this.getFullDetails = (visibleItems, detailsId) => {
            for(let i in visibleItems){
              if(visibleItems[i].id === detailsId)
              return visibleItems[i];
            }
        };

        this.saveChanges = (label, description) => {
            const { onTodoChange, detailsId } = this.props;

            let labelFieldText = document.querySelector(".app-details-editable-label").innerText;
            let descriptionFieldText = document.querySelector(".app-details-editable-description").innerText;

            if(label !== labelFieldText || description !== descriptionFieldText){
                if(labelFieldText === ""){
                    labelFieldText = "Без названия"
                }
                if(descriptionFieldText === ""){
                    descriptionFieldText = "Без описания"
                }
                onTodoChange(detailsId, labelFieldText, descriptionFieldText);
            }
        };
    };

    render() {
        const { visibleItems, detailsId, isVisible, onHideDetails} = this.props;
        const itemDetails = this.getFullDetails(visibleItems, detailsId);
        const label = itemDetails ? itemDetails.label : "Без названия";
        const description = itemDetails ? itemDetails.description : "Без описания";

        const classToggleVision = isVisible ? "app-details" : "app-details hide"

        return(
            <div className={ classToggleVision }>
                <h2>Описание</h2>
                <span 
                    className="app-details-close fa fa-times"
                    onClick={ () => onHideDetails()}>
                </span>

                <p>
                    <b>Название: </b>
                    <span className="app-details-editable app-details-editable-label" contentEditable={true} suppressContentEditableWarning={true}>{ label }</span>
                </p>
                <p className="app-details__description">
                    <b>Описание: </b>
                    <span className="app-details-editable app-details-editable-description" contentEditable={true} suppressContentEditableWarning={true}>{ description }</span>
                </p>
                <button className="btn btn-outline-primary"
                        onClick={() => this.saveChanges(label, description)}>
                    Сохранить
                </button>
            </div>
        )
    }
}