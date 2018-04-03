import LottoStore from './LottoStore';

import React, {Component} from "react";

class Buy extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.props.activeNextStep(this.props.nextStep);
        this.props.loadFromServer();
    }

    render() {
        return (<LottoStore
            root={this.props.root}
            activeNextStep={this.handleSubmit}
        />);
    }
}

export default Buy;