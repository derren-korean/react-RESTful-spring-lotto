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

const MAX_PAGE_SIZE = 10;
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

    loadFromServer(pageSize) {
        this.loadLottoList(pageSize);
        this.loadWinningLotto(pageSize);
    }

    loadLottoList(pageSize) {
        if (!pageSize) {
            pageSize = MAX_PAGE_SIZE;
        }
        follow(client, root, [
            {rel: 'lottoes', params: {size: pageSize}}]
        ).then(lottoesCollection => {
            return client({
                method: 'GET',
                path: lottoesCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(schema => {
                this.schema = schema.entity;
                this.links = lottoesCollection.entity._links;
                return lottoesCollection;
            });
        }).then(lottoesCollection => {
            if(!lottoesCollection.entity._embedded.lottoes.length) return false;
            return lottoesCollection.entity._embedded.lottoes.map(lotto =>
                client({
                    method: 'GET',
                    path: lotto._links.self.href
                })
            );
        }).then(lottoPromises => {
            return when.all(lottoPromises);
        }).done(lottoes => {
            if (!lottoes.length) return;
            this.setState({
                lottoList: lottoes.map(lotto=>lotto.entity.lotto.map(number=>number.number)),
                attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: this.links
            });
        });
    }

    loadWinningLotto(pageSize) {
        if (!pageSize) {
            pageSize = MAX_PAGE_SIZE;
        }
        follow(client, root, [
            {rel: 'winningLottoes', params: {size: pageSize}}]
        ).then(wLottoesCollection => {
            return client({
                method: 'GET',
                path: wLottoesCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(schema => {
                this.schema = schema.entity;
                this.links = wLottoesCollection.entity._links;
                return wLottoesCollection;
            });
        }).then(wlottoesCollection => {
            if (!wlottoesCollection.entity._embedded.winningLottoes.length) return false;
            return wlottoesCollection.entity._embedded.winningLottoes.map(lotto =>
                client({
                    method: 'GET',
                    path: lotto._links.self.href
                })
            );
        }).then(wlottoPromises => {
            return when.all(wlottoPromises);
        }).done(wlottoes => {
            if(!wlottoes.length) return;
            this.setState({
                winningNumber: wlottoes[wlottoes.length-1].entity.lotto.map(number=>number.number).join(SPLIT_SYMBOL),
                bonusNumber: wlottoes[wlottoes.length-1].entity.luckyNumber.number.toString(),
                attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: this.links
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