import React,{Component} from "react";
import LottoMachine from "./LottoMachine";
import BonusNumberMachine from "./BonusNumberMachine";

const client = require('../client');
const follow = require('../follow');

const SPLIT_SYMBOL = ",";

class WinningLottoGenerator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            winningNumber: "",
            bonusNumber:""
        };
        this.setWinningNumber = this.setWinningNumber.bind(this);
        this.setBonusNumber = this.setBonusNumber.bind(this);
        this.submitWinningLotto = this.submitWinningLotto.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toLottoArray = this.toLottoArray.bind(this);
    }

    setWinningNumber(number) {
        this.setState({
            winningNumber: number
        });
    }

    setBonusNumber(number) {
        this.setState({
            bonusNumber: number
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let winnigLotto = {lotto: this.toLottoArray(this.state.winningNumber), luckyNumber: {number: this.state.bonusNumber}};
        if (this.state.winningNumber.length == 0) {
            if (!confirm("당첨 번호를 입력하지 않으면 자동으로 입력됩니다. 진행하시겠습니까?")) {
                return;
            }
            winnigLotto = {};
        }
        if (this.state.winningNumber.length && this.state.bonusNumber.length == 0) {
            alert("행운 번호를 입력해주세요.");
            return;
        }
        this.submitWinningLotto(winnigLotto);
        this.props.onSubmit();
    }

    toLottoArray(numbers) {
        if(numbers.indexOf(SPLIT_SYMBOL) < 1) return "";
        return numbers.split(SPLIT_SYMBOL).map(_number=>Object({number:_number}));
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
        }).done(winningLotto=>{
            self.props.loadFromServer();
        })
    }

    render() {
        const lottoFontStyle = {
            fontWeight: 'bold',
            fontSize: 'large'
        };
        const lastNumber = {
            backgroundColor: "#eee",
            borderRadius: "3px",
            textAlign: "center",
            border: "1px solid #ccc",
            padding: "0.5em 0"
        };
        const bonusNumber = this.state.bonusNumber.length ? <span style={lottoFontStyle}> + {this.state.bonusNumber} </span> : <span></span>;
        return(
            <form onSubmit={this.handleSubmit} className="form-show">
                <div style={lastNumber} className="form-show-div form-group">
                    <span> 당첨 번호: </span>
                    <span style={lottoFontStyle}>{this.state.winningNumber}</span>
                    {bonusNumber}
                </div>
                <div className="form-show-div form-group">
                    <LottoMachine className="margin-bottom" addLotto={this.setWinningNumber} btnSize="btn-sm"/>
                </div>
                <div className="form-show-div form-group">
                    <BonusNumberMachine lotto={this.state.winningNumber} addNumber={this.setBonusNumber} />
                </div>
                <div className="submit-button">
                    <button type="submit" value="Submit" className="btn btn-lg btn-primary btn-block">결과 확인</button>
                </div>
            </form>
        )
    }
}

export default WinningLottoGenerator