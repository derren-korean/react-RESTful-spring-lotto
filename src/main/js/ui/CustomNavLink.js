import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

class CustomNavLink extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cursor: 'no-drop',
            color: '#777'
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.changeState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.changeState(nextProps);
    }

    changeState(pops) {
        let cursor = pops.disabled ? 'no-drop' : 'pointer';
        let color = pops.disabled ? '#777' : '#fff';
        this.setState({
            cursor: cursor,
            color: color
        });
    }

    handleClick(e) {
        this.props.goToLink(e, this.props.disabled);
    }

    render() {
        return (
            <li><NavLink
                onClick={this.handleClick}
                to={this.props.to}
                style={{cursor:this.state.cursor, color:this.state.color}}
            >{this.props.text}</NavLink></li>
        );
    }
}

export default CustomNavLink