import React, { Component } from "react";

import "./app-details.css";

export default class AppDetails extends Component {
    render() {
        const { onHideDetails, detailsId, visibleItems, isVisible } = this.props;

        let classList = "app-details"

        if(!isVisible){
            classList += " hide"
        }

        return(
            <div className={classList} 
                onClick={ onHideDetails }>
                <span className="app-details-close fa fa-times"></span>
                { detailsId }
            </div>
        )
    }
}