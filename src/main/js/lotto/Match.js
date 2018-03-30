import React, { Component } from "react";
import LottoPrinter from "./LottoTrPrinter";
import WinningLottoGenerator from "./WinningLottoGenerator";
const client = require('../client');
const follow = require('../follow');
const when = require('when');

const MAM_PAGE_SIZE = 10;

class Match extends Component {
    constructor(props) {
        super(props);
        this.state = {lottoList: []};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadFromServer = this.loadFromServer.bind(this);
    }

    componentDidMount() {
        this.loadFromServer(MAM_PAGE_SIZE);
    }

    loadFromServer(pageSize) {
        follow(client, this.props.root, [
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
            return lottoesCollection.entity._embedded.lottoes.map(lotto =>
                client({
                    method: 'GET',
                    path: lotto._links.self.href
                })
            );
        }).then(lottoPromises => {
            return when.all(lottoPromises);
        }).done(lottoes => {
            this.setState({
                lottoList: lottoes.map(lotto=>lotto.entity.lotto.map(number=>number.number)),
                attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: this.links
            });
        });
    }

    handleSubmit() {
        this.props.activeNextStep(this.props.nextStep);
    }

    render() {
        return (
            <div>
                <WinningLottoGenerator root={this.props.root} onSubmit={this.handleSubmit} />
                <pre className="pre-scrollable">
                    <h4 className="text-center">&lt;{this.state.lottoList.length}개를 구매 하셨습니다&gt;</h4>
                    <table className="table">
                        <thead>
                            <tr><th></th>
                            <th className="text-center">로또 번호</th>
                        </tr></thead>
                        <tbody>
                        {this.state.lottoList.map((lotto, index) =>
                            <LottoPrinter key={lotto.toString()+index}
                                          lotto={lotto}
                                          index={index}
                            />
                        )}
                        </tbody>
                    </table>
                </pre>
            </div>
        )
    }
}

export default Match;