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
    };

    render() {
        const { visibleItems, detailsId, isVisible, onHideDetails } = this.props;
        const itemDetails = this.getFullDetails(visibleItems, detailsId);
        const label = itemDetails ? itemDetails.label : "";
        const description = itemDetails ? itemDetails.description : "";

        const classToggleVision = isVisible ? "app-details" : "app-details hide"

        return(
            <div className={ classToggleVision } 
                onClick={ () => onHideDetails()}>
                <h2>Описание</h2>
                <span className="app-details-close fa fa-times"></span>

                <p><b>Название:</b> { label }</p>
                <p><b>Описание:</b> { description }</p>
            </div>
        )
    }
}