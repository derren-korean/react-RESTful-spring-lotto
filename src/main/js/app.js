import React from 'react';
import ReactDOM from 'react-dom';

import {
    Route,
    BrowserRouter
} from "react-router-dom";

import Buy from "./lotto/Buy";
import Match from "./lotto/Match";
import Result from "./lotto/Result";
import CustomNavLink from "./ui/CustomNavLink";

const client = require('./client');
const follow = require('./follow');
const when = require('when');
const root = "/api";

const LOTTO_MAX_SIZE = 10;
const WINNING_MAX_SIZE = 1;
const SPLIT_SYMBOL = ",";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            buy: true,
            match: true,
            result: true,
            lottoList: [],
            winningNumber: "",
            bonusNumber: ""
        };
        this.goToLink = this.goToLink.bind(this);
        this.loadFromServer = this.loadFromServer.bind(this);
        this.activeNextStep = this.activeNextStep.bind(this);
        this.initClientAndServer = this.initClientAndServer.bind(this);
        this.loadLottoList = this.loadLottoList.bind(this);
        this.loadWinningLotto = this.loadWinningLotto.bind(this);


    }
    componentDidMount() {
        this.activeNextStep("buy");
    }

    loadFromServer() {
        this.loadLottoList();
        this.loadWinningLotto();
    }

    loadLottoList() {
        client({method: 'GET', path: 'lotto/last/'+LOTTO_MAX_SIZE})
            .done(lottoes => {
                if (lottoes.entity.length == 0) return;
                this.setState({
                    lottoList: lottoes.entity.map(lotto=>lotto.lotto.map(number=>number.number))
                });
            });
    }

    loadWinningLotto() {
        client({method: 'GET', path: 'lotto/last/winning'})
            .done(wlottoes => {
                if (!wlottoes.entity.hasOwnProperty('luckyNumber')) return;
                this.setState({
                    winningNumber: wlottoes.entity.lotto.map(number=>number.number).join(SPLIT_SYMBOL),
                    bonusNumber: wlottoes.entity.luckyNumber.number.toString(),
                });
            });
    }

    goToLink(e, disabled) {
        if (disabled) {
            e.preventDefault();
        }
    }
    activeNextStep(target) {
        this.setState({
            [target]:false
        });
    }
    initClientAndServer() {
        this.setState({
            match: true,
            result: true
        });

        //todo : delete db
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <h1>Lotto SPA</h1>
                    <ul className="header">
                        <CustomNavLink goToLink={this.goToLink} disabled={this.state.buy} to="/buy" text="로또 구매" />
                        <CustomNavLink goToLink={this.goToLink} disabled={this.state.match} to="/match" text="당첨 번호" />
                        <CustomNavLink goToLink={this.goToLink} disabled={this.state.result} to="/result" text="결과 확인" />
                    </ul>
                    <div className="content">
                        <Route path="/buy"
                               component={(props) => (
                                   <Buy {...props}
                                        root={root}
                                        nextStep="match"
                                        activeNextStep={this.activeNextStep}
                                        loadLottoList={this.loadLottoList}
                                    />
                       )}/>
                        <Route path="/match" component={(props) => (
                            <Match
                                {...props}
                                root={root}
                                nextStep="result"
                                splitSymbol={SPLIT_SYMBOL}
                                lottoList={this.state.lottoList}
                                winningNumber={this.state.winningNumber}
                                bonusNumber={this.state.bonusNumber}
                                activeNextStep={this.activeNextStep}
                                loadFromServer={this.loadFromServer}
                            />
                        )}/>
                        <Route path="/result" component={(props) => (
                            <Result
                                {...props}
                                root={root}
                                nextStep="buy"
                                lottoList={this.state.lottoList}
                                winningNumber={this.state.winningNumber}
                                bonusNumber={this.state.bonusNumber}
                                initClientAndServer={this.initClientAndServer}
                            />
                        )}/>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
);