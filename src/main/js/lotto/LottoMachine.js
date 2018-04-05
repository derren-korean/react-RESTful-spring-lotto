import React, {Component} from "react";

const PARSING_SYMBOL = ",";
const MIN_NUMBER = 1;
const MAX_NUMBER = 45;

const ENTER_KEY = 13;
const LOTTO_NUMBER_COUNT = 6;

class LottoMachine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numbers: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.createLotto = this.createLotto.bind(this);
        this.preventSubmit = this.preventSubmit.bind(this);

        this.hasSplitSymbol = this.hasSplitSymbol.bind(this);
        this.hasInvalidNumber = this.hasInvalidNumber.bind(this);
        this.wrongNumberCount = this.wrongNumberCount.bind(this);
        this.rangeCheck = this.rangeCheck.bind(this);
    }

    handleChange(event) {
        this.setState({
            numbers : event.target.value.trim()
        })
    }

    preventSubmit(event) {
        if (event.keyCode == ENTER_KEY) {
            this.createLotto();
            event.preventDefault();
        }
    }

    createLotto() {
        if (this.props.disabled) return;
        if (this.hasInvalidValue()) {
            alert("입력 형식에 어긋났습니다. 다음과 같이 입력해주세요.\n예시: 1,2,3,4,5,6")
            return;
        }
        if (this.hasInvalidNumber()) {
            alert("입력 가능한 숫자는 0 - 45까지 입니다. 중복된 숫자 없이 입력해주세요.\n예시: 1,2,3,4,5,6")
            return;
        }
        this.props.addLotto(this.state.numbers);
        this.setState({
            numbers : ""
        })
    }

    hasInvalidValue() {
        if (!this.hasSplitSymbol()) return true;
        if (this.wrongNumberCount()) return true;
        return false;
    }

    hasSplitSymbol() {
        return this.state.numbers.indexOf(PARSING_SYMBOL) != -1
    }

    wrongNumberCount() {
        return this.state.numbers.split(PARSING_SYMBOL).length != LOTTO_NUMBER_COUNT;
    }

    hasInvalidNumber() {
        let numbers = this.state.numbers.split(PARSING_SYMBOL);
        if (this.hasNaN(numbers)) return true;
        if (this.rangeCheck(numbers)) return true;
        if (this.hasSameNumber(numbers)) return true;
        return false;
    }

    hasNaN(numbers) {
        return numbers.find((number)=>!number.match(/^[0-9]*$/));
    }

    rangeCheck(numbers) {
        return numbers.find((number)=>number < MIN_NUMBER || number > MAX_NUMBER);
    }

    hasSameNumber(numbers) {
        while(numbers.length) {
            if (this.contains(numbers, numbers.splice(0,1))) return true;
        }
        return false;
    }

    contains(a, number) {
        var i = a.length;
        while (i--) {
            if (a[i] == number) {
                return true;
            }
        }
        return false;
    }

    render() {
        let btnClassName = "btn btn-primary btn-block ";
        if (this.props.btnSize) {
            btnClassName += this.props.btnSize;
        }
        return (
            <div className="disable">
                <span>예) 1,2,3,4,5,6(한 라인에 6개를 입력해주세요.) 숫자 범위 : 0~45</span>
                <input value={this.state.numbers} disabled={this.props.disabled} type="text" name="numbers" className="form-control" placeholder="1,2,3,4,5,6"
                       onChange={this.handleChange}
                       onKeyDown={this.preventSubmit}
                       />
                <div onClick={this.createLotto} disabled={this.props.disabled} className={btnClassName} >로또 등록</div>
            </div>
        )
    }
}

export default LottoMachine