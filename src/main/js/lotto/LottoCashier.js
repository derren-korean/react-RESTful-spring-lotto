import React, { Component } from "react";

class LottoCashier extends Component {

    constructor(props) {
        super(props);
        this.state = {
            money: this.props.unit
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.updateTotalCount(this.toCount(this.state.money));
    }

    handleChange(event) {
        if (event.target.value > this.props.max) {
            alert("최대 금액 : ₩"+this.props.max.toLocaleString()+" 입니다.");
            return;
        }
        this.props.updateTotalCount(this.toCount(event.target.value));
        this.setState({
            money : event.target.value
        });
    }

    toCount(target) {
        return Math.floor(target/this.props.unit);
    }

    render() {
        return (
            <input onChange={this.handleChange} value={this.state.money}
                   type="number" name="money" className="form-control" placeholder="금액 입력" min="1000" max="10000" step={this.props.unit} />
        )
    }
}

export default LottoCashier;