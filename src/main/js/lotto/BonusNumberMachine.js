import React, {Component} from "react";
import LottoSelector from "./LottoSelector";

const ENTER_KEY = 13;

class BonusNumberMachine extends Component {

    constructor(props) {
        super(props);
        this.state = {bonusNumber: ''};
        this.handleChange = this.handleChange.bind(this);
        this.addNumber = this.addNumber.bind(this);
        this.preventSubmit = this.preventSubmit.bind(this);
    }

    preventSubmit(event) {
        if (event.keyCode == ENTER_KEY) {
            this.addNumber();
            event.preventDefault();
        }
    }

    handleChange(event) {
        this.setState({
            bonusNumber: event.target.value
        })
    }

    addNumber() {
        if (this.invalid(this.state.bonusNumber)) return;
        this.props.addNumber(this.state.bonusNumber);
        this.setState({
            bonusNumber: ""
        })
    }

    invalid(value) {
        if (this.props.lotto.length == 0) {
            alert("당첨 번호를 먼저 입력해주세요.");
            return true;
        }
        if (this.hasNumber(value)) {
            alert("당첨 번호에 같은 번호가 있습니다.\n 다른 번호를 입력해주세요.");
            return true;
        }
        return false
    }

    hasNumber(value) {
        return this.props.lotto.find(number => number == value);
    }

    render() {
        return(
            <div>
                <LottoSelector maxLength={1}
                               btnSize="btn-sm"
                               onCreate={this.addNumber}
                />
            </div>
        )
    }

}

export default BonusNumberMachine