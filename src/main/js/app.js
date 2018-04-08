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
const root = "/api";

const LOTTO_MAX_SIZE = 10;
const SPLIT_SYMBOL = ",";

const RESULT = 0;
const PROFIT = 1;

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            buy: true,
            match: true,
            result: true,
            lottoList: [],
            winningNumber: [],
            bonusNumber: 0,
            lottoRank: [],
            results: {},
            profit: "",
        };
        this.goToLink = this.goToLink.bind(this);
        this.activeNextStep = this.activeNextStep.bind(this);
        this.loadLottoRank = this.loadLottoRank.bind(this);
        this.loadFromServer = this.loadFromServer.bind(this);
        this.loadLottoList = this.loadLottoList.bind(this);
        this.loadWinningLotto = this.loadWinningLotto.bind(this);
        this.loadResult = this.loadResult.bind(this);
        this.initClientAndServer = this.initClientAndServer.bind(this);
        this.deleteAllLotto = this.deleteAllLotto.bind(this);

    }
    componentDidMount() {
        this.activeNextStep("buy");
        this.loadLottoRank();
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
                if (!wlottoes.entity.hasOwnProperty('luckyNumber')) {
                    this.setState({
                        winningNumber: "",
                        bonusNumber: ""
                    });
                    return;
                }
                this.setState({
                    winningNumber: wlottoes.entity.lotto.map(number=>number.number),
                    bonusNumber: wlottoes.entity.luckyNumber.number,
                });
                this.loadResult();
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

        this.deleteAllLotto();
    }

    deleteAllLotto() {
        client({method: 'GET', path: 'lotto/active'}).done(response => {
            response.entity.forEach((lotto, index)=>{
                lotto.active = false;
                client({
                    method: 'PUT',
                    path: lotto.links[0].href,
                    entity: lotto,
                    headers: {'Content-Type': 'application/json'}
                }).done(response=>{
                    if (response.status.code != 200) {
                        alert("서버 통신을 실패하였습니다.");
                        return;
                    }
                })
            })
        });
    }

    loadLottoRank() {
        client({method: 'GET', path: '/lottoRank'}).done(response => {
            if (response.status.code != 200) {
                alert("서버 통신을 실패하였습니다.");
                return;
            }
            this.setState({
                lottoRank: response.entity.map((rank)=>{return JSON.parse(rank.content)})
            });
        });
    }

    loadResult() {
        client({method: 'GET', path: '/result'}).done(response => {
            if (response.status.code != 200) {
                alert("서버 통신을 실패하였습니다.");
                return;
            }
            const results = response.entity._embedded.strings;
            const resultObject = this.toResultObject(results[RESULT]);
            this.setState({
                results: resultObject,
                profit: results[PROFIT]
            });
        });
    }

    toResultObject(list) {
        let resultObject = {};
        list.split(',')
            .map((rank)=>JSON.parse(rank))
            .forEach((result,index)=> {
                let key = Object.keys(result)[0];
                resultObject[key] = result[key];
            });
        return resultObject;
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
                        <Route path="/buy" component={(props) => (
                           <Buy {...props}
                                root={root}
                                nextStep="match"
                                activeNextStep={this.activeNextStep}
                                loadFromServer={this.loadFromServer}
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
                                disabled={this.state.result}
                                lottoRank={this.state.lottoRank}
                                result={this.state.results}
                                profit={this.state.profit}
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