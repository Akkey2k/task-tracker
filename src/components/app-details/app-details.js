import React, { Component } from "react";

import "./app-details.css";

export default class AppDetails extends Component {
    constructor(){
        super();

        this.hideDetails = () => {
            const details = document.querySelector(".app-details");

            details.className += " hide";
        };
    }

    render() {
        const { detailsId } = this.props;

        return(
            <div className="app-details"
                onClick={ this.hideDetails }>
                <span className="app-details-close fa fa-times"></span>
                { detailsId }
            </div>
        )
    }
}