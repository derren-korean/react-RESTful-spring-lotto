import React, { Component } from "react";
import WinningLottoGenerator from "./WinningLottoGenerator";
import LottoListPrinter from "./LottoListPrinter";

const MAM_PAGE_SIZE = 10;

class Match extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getDerivedStateFromProps() {
        this.props.loadFromServer();
    }

    handleSubmit() {
        this.props.activeNextStep(this.props.nextStep);
    }

    render() {
        return (
            <div>
                <WinningLottoGenerator root={this.props.root} winningNumber={this.props.winningNumber} bonusNumber={this.props.bonusNumber} onSubmit={this.handleSubmit} loadFromServer={this.props.loadFromServer}/>
                <pre className="pre-scrollable">
                    <h4 className="text-center">&lt;{this.props.lottoList.length}개를 구매 하셨습니다&gt;</h4>
                    <LottoListPrinter lottoList={this.props.lottoList}/>
                </pre>
            </div>
        )
    }
}

export default Match;