import React, { Component } from "react";
import ResultPrinter from "./ResultPrinter";

class Result extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.props.disabled) {
            this.props.initClientAndServer();
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="form-result">
                    <div className="submit-button">
                        <button disabled={this.props.disabled} className="btn btn-lg btn-primary btn-block" type="submit" value="Submit">다시 하기</button>
                    </div>
                </form>
                <ResultPrinter lottoRank={this.props.lottoRank} result={this.props.result} profit={this.props.profit}/>
            </div>
        );
    }
}

export default Result;