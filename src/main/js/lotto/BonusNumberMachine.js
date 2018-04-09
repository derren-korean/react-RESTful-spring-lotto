import React, {Component} from "react";
import LottoSelector from "./LottoSelector";

class BonusNumberSelector extends Component {

    constructor(props) {
        super(props);
        this.addNumber = this.addNumber.bind(this);
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
        if(this.props.lotto.length == 0) {
            return <div></div>
        }
        return(
            <div>
                <LottoSelector maxLength={1}
                               buttonText="보너스 번호"
                               id="Number"
                               btnSize="btn-sm"
                               onCreate={this.addNumber}
                />
            </div>
        )
    }

}

export default BonusNumberSelector