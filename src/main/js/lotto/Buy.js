import LottoStore from './LottoStore';

import React, {Component} from "react";

class Buy extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.props.activeNextStep(this.props.nextStep);
    }

    render() {
        return (<LottoStore activeNextStep={this.handleSubmit} root={this.props.root}/>);
    }
}

export default Buy;