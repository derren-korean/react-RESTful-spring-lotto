import React, { Component } from "react";
import LottoPrinter from "./LottoTrPrinter";
const client = require('../client');
const follow = require('../follow');
const when = require('when');

class Match extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winningNumber: "",
            bonusNumber: 0,
            lottoList: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadFromServer = this.loadFromServer.bind(this);
    }

    componentDidMount() {
        this.loadFromServer(10)
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

    handleChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });

        console.log(target.value);
    }

    handleSubmit(event) {
        this.props.activeNextStep(this.props.nextStep);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="form-show">
                    <div className="form-show-div form-group">
                        <label> 지난 주 당첨 번호:
                            <input type="text" className="form-control" name="winningNumber" placeholder="1,2,3,4,5,6" />
                        </label>
                    </div>
                    <div className="form-show-div form-group">
                        <label> 2등 보너스 볼:
                            <input type="number" className="form-control" name="bonusNumber" />
                        </label>
                    </div>
                    <div className="submit-button">
                        <button type="submit" value="Submit" className="btn btn-lg btn-primary btn-block">당첨 번호</button>
                    </div>
                </form>
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