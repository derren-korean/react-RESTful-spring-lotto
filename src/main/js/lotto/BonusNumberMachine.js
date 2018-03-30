import React, {Component} from "react";

const MIN_NUMBER = 1;
const MAX_NUMBER = 45;
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
    }

    invalid(value) {
        if (value < MIN_NUMBER || value > MAX_NUMBER) {
            alert("숫자 입력 가능 범위 : "+MIN_NUMBER +" ~ "+MAX_NUMBER);
            return true;
        }
        if (this.props.lotto.length == 0) {
            alert("당첨 번호를 먼저 입력해주세요.");
            return true;
        }
        if (this.props.lotto.indexOf(value) > -1) {
            alert("당첨 번호에 같은 번호가 있습니다.\n 다른 번호를 입력해주세요.");
            return true;
        }
        return false
    }

    render() {
        const btnStyle = {
            marginLeft: "1em",
            marginBottom: "5px"
        };
        return(
            <div>
                <label>
                    2등 보너스 볼:
                    <input onChange={this.handleChange} onKeyDown={this.preventSubmit} type="text" value={this.state.bonusNumber} className="form-control" maxLength="2" />
                </label>
                <div onClick={this.addNumber} style={btnStyle} className="btn btn-primary btn-md">추가</div>
            </div>
        )
    }

}

export default BonusNumberMachine