import React,{Component} from "react";

import BonusNumberMachine from "./BonusNumberMachine";
import LottoNumber from "./LottoNumber";
import LottoSelector from "./LottoSelector";
import Lotto from "./Lotto";

const client = require('../client');
const follow = require('../follow');

class WinningLottoGenerator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            winningNumber: [],
            bonusNumber:0
        };
        this.setWinningNumber = this.setWinningNumber.bind(this);
        this.setBonusNumber = this.setBonusNumber.bind(this);
        this.submitWinningLotto = this.submitWinningLotto.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toLottoArray = this.toLottoArray.bind(this);
    }

    setWinningNumber(number) {
        this.setState({
            winningNumber: number,
        });
    }

    setBonusNumber(number) {
        this.setState({
            bonusNumber: number
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let winningLotto = {lotto: this.toLottoArray(this.state.winningNumber), luckyNumber: {number: this.state.bonusNumber}};
        if (this.state.winningNumber.length == 0) {
            if (!confirm("당첨 번호를 입력하지 않으면 자동으로 입력됩니다. 진행하시겠습니까?")) {
                return;
            }
            winningLotto = {};
        }
        if (this.state.winningNumber.length && this.state.bonusNumber == 0) {
            alert("행운 번호를 입력해주세요.");
            return;
        }
        this.submitWinningLotto(winningLotto);
    }

    toLottoArray(numbers) {
        if (numbers.length == 0) return;
        return numbers.map(_number=>Object({number:_number}));
    }

    submitWinningLotto(lotto) {
        const self = this;
        follow(client, this.props.root, ['winningLottoes']).then(response => {
            return client({
                method: 'POST',
                path: response.entity._links.self.href,
                entity: lotto,
                headers: {'Content-Type': 'application/json'}
            })
        }).done(()=>{
            self.setWinningNumber([]);
            self.setBonusNumber(0);
            this.props.onSubmit();
        })
    }

    render() {
        const winningNumber = this.state.winningNumber.length ? this.state.winningNumber : this.props.winningNumber;
        let bonusNumber = this.props.bonusNumber;
        if (this.state.winningNumber.length) {
            bonusNumber = this.state.bonusNumber;
        }
        bonusNumber = winningNumber.length ? <span> + <LottoNumber number={bonusNumber} lastNumber={true}/> </span> : <span></span>;
        return(
            <form onSubmit={this.handleSubmit} className="form-show">
                <div className="form-show-div form-group winningLotto">
                    <h4> 당첨 번호 </h4>
                    <div>
                        <Lotto lotto={winningNumber} />
                        {bonusNumber}
                    </div>
                </div>
                <div className="form-show-div form-group">
                    <LottoSelector className="margin-bottom"
                                   maxLength={6}
                                   onCreate={this.setWinningNumber}
                    />
                </div>
                <div className="form-show-div form-group">
                    <BonusNumberMachine
                        lotto={this.state.winningNumber}
                        addNumber={this.setBonusNumber}
                    />
                </div>
                <div className="submit-button">
                    <button type="submit" value="Submit" className="btn btn-lg btn-primary btn-block">결과 확인</button>
                </div>
            </form>
        )
    }
}

export default WinningLottoGenerator