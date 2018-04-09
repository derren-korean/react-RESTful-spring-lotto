import React, {Component} from "react";
import LottoSelector from "./LottoSelector";

const ENTER_KEY = 13;

class BonusNumberMachine extends Component {

    constructor(props) {
        super(props);
        this.addNumber = this.addNumber.bind(this);
        this.preventSubmit = this.preventSubmit.bind(this);
    }

    preventSubmit(event) {
        if (event.keyCode == ENTER_KEY) {
            this.addNumber();
            event.preventDefault();
        }
    }

    addNumber(number) {
        if (Array.isArray(number)) {
            number = number[0];
        }
        if (this.invalid(number)) return;
        this.props.addNumber(number);
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
                               id="Number"
                               btnSize="btn-sm"
                               onCreate={this.addNumber}
                />
            </div>
        )
    }

}

export default BonusNumberMachine