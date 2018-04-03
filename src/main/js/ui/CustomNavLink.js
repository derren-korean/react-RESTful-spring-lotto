import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

class CustomNavLink extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.goToLink(e, this.props.disabled);
    }

    render() {
        const cursor = this.props.disabled ? 'no-drop' : 'pointer';
        const color = this.props.disabled ? '#777' : '#fff';
        return (
            <li><NavLink
                onClick={this.handleClick}
                to={this.props.to}
                style={{cursor:cursor, color:color}}
            >{this.props.text}</NavLink></li>
        );
    }
}

export default CustomNavLink