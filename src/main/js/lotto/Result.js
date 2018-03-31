import React, { Component } from "react";

const client = require('../client');
const RESULT = 0;
const PROFIT = 1;

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lottoRank: [],
            result: [],
            profit: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadLottoRank = this.loadLottoRank.bind(this);
        this.loadResult = this.loadResult.bind(this);
    }

    componentDidMount() {
        this.loadLottoRank();
        this.loadResult();
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
            this.setState({
                result: results[RESULT].split(',').map((rank)=>JSON.parse(rank)),
                profit: results[PROFIT]
            });
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.initClientAndServer();
    }

    render() {
        const stateResult = this.state.result;
        const ready = stateResult.length && this.state.lottoRank;
        let results = ready ? "" : "<tr></tr>";
        if (ready) {
            this.state.lottoRank.forEach((rank, index)=>{
                results += <tr><th>{rank.matchingCount}개 일치 ({rank.price}원)- {stateResult[index][rank.name]}</th></tr>
            });
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="form-result">
                    <div className="submit-button">
                        <button className="btn btn-lg btn-primary btn-block" type="submit" value="Submit">다시 하기</button>
                    </div>
                </form>
                <pre className="pre-scrollable">
                    <table className="table">
                        <thead>
                            <tr><th><h3 className="text-center">당첨 통계</h3></th>
                        </tr></thead>
                        <tbody>
                            {results}
                        </tbody>
                        <tfoot>
                            <tr><th><h4 className="text-center">총 수익률은 {this.state.profit}%입니다.</h4></th>
                        </tr></tfoot>
                    </table>
                </pre>
            </div>
        );
    }
}

export default Result;