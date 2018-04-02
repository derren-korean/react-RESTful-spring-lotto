import React, { Component } from "react";
import ResultPrinter from "./resultPrinter";

const client = require('../client');
const RESULT = 0;
const PROFIT = 1;

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lottoRank: [],
            result: {},
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
            const resultObject = this.toResultObject(results[RESULT]);
            this.setState({
                result: resultObject,
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

    handleSubmit(event) {
        event.preventDefault();
        this.props.initClientAndServer();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="form-result">
                    <div className="submit-button">
                        <button className="btn btn-lg btn-primary btn-block" type="submit" value="Submit">다시 하기</button>
                    </div>
                </form>
                <ResultPrinter lottoRank={this.state.lottoRank} result={this.state.result} profit={this.state.profit}/>
            </div>
        );
    }
}

export default Result;