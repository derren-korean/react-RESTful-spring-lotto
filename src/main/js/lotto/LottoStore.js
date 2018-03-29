import React, { Component } from "react";
import LottoCashier from "./LottoCashier";
import LottoGenerator from "./LottoGenerator";
import LottoPurchaseStatus from "./LottoPurchaseStatus";

const client = require('../client');
const follow = require('../follow');

class LottoStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalCount: 0,
            manualLottoList: []
        };
        this.updateTotalCount = this.updateTotalCount.bind(this);
        this.addLotto = this.addLotto.bind(this);
        this.removeLotto = this.removeLotto.bind(this);
        this.onDeleteLotto = this.onDeleteLotto.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }

    updateTotalCount(total) {
        this.setState({
            totalCount: total
        });

        while (total < this.state.manualLottoList.length) {
            this.removeLotto(this.state.manualLottoList.length-1)
        }
    }

    addLotto(lotto) {
        this.setState({
            manualLottoList: [...this.state.manualLottoList, lotto]
        });

    }

    removeLotto(index) {
        let list = this.state.manualLottoList;
        list.splice(index,1);

        this.setState({manualLottoList: list});
    }

    onDeleteLotto(lottoIndex) {
        this.removeLotto(lottoIndex);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.state.manualLottoList.forEach(lotto=>{
            this.onCreate(lotto);
        });
        let index = this.state.manualLottoList.length;
        for (index; index < this.state.totalCount; index++) {
            this.onCreate({});
        }
        this.props.onSubmit();
    }

    onCreate(newLotto) {
        follow(client, this.props.root, ['lottoes']).then(response => {
            return client({
                method: 'POST',
                path: response.entity._links.self.href,
                entity: newLotto,
                headers: {'Content-Type': 'application/json'}
            })
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form-lotto">
                <div className="margin-bottom">
                    <h2 className="text-center">로또 게임</h2>
                    <div className="input-group">
                        <div className="input-group-addon">￦</div>
                        <LottoCashier updateTotalCount={this.updateTotalCount} max={10000} unit={1000} />
                    </div>
                </div>
                <div>
                    <div className="form-show-div margin-bottom">
                        <LottoGenerator addLotto={this.addLotto} disabled={this.state.totalCount - this.state.manualLottoList.length == 0}/>
                    </div>
                    <div className="form-show-div margin-bottom">
                        <LottoPurchaseStatus count={this.state.totalCount} lottoList={this.state.manualLottoList} onDeleteLotto={this.onDeleteLotto}/>
                    </div>
                </div>
                <div className="submit-button">
                    <button type="submit" value="Submit" className="btn btn-lg btn-primary btn-block">로또 구매</button>
                </div>
            </form>
        )
    }
}

export default LottoStore;