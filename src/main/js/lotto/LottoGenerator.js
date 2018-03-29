import React, { Component } from "react";

const PARSING_SYMBOL = ",";
const MiN_NUMBER = 0;
const MAX_NUMBER = 46;
const MIN_LENGTH = 11;
const MAN_LENGTH = 17;

class LottoGenerator extends Component{

    constructor(props) {
        super(props);
        this.state = {
            numbers: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.createLotto = this.createLotto.bind(this);
        this.preventSubmit = this.preventSubmit.bind(this);
    }

    preventSubmit(event) {
        if (event.keyCode == 13) {
            this.createLotto();
            event.preventDefault();
        }
    }

    handleChange(event) {
        this.setState({
            numbers : event.target.value.trim()
        })
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
        if (this.state.numbers.length < MIN_LENGTH || this.state.numbers.length > MAN_LENGTH) return true;
        if (this.state.numbers.indexOf(PARSING_SYMBOL) < 1) return true;
        return false;
    }

    hasInvalidNumber() {
        let numbers = this.state.numbers.split(PARSING_SYMBOL);
        if (numbers.find((number)=>!number.match(/^[0-9]*$/))) return true;
        if (numbers.find((number)=>number < MiN_NUMBER || number > MAX_NUMBER)) return true;
        if (this.hasSameNumber(numbers)) return true;
        return false;
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

    information() {
        if (this.props.disabled) {
            return (
                <div>
                    <span className="redColor">구매 금액을 추가하면 활성화 됩니다.</span>
                </div>
            )
        }
        return <div></div>
    }

    render() {
        return(
            <div className="disable">
                <span>예) 1,2,3,4,5,6(한 라인에 6개를 입력해주세요.) 숫자 범위 : 0~45</span>
                <input onChange={this.handleChange} value={this.state.numbers} disabled={this.props.disabled} type="text" name="numbers" className="form-control" placeholder="1,2,3,4,5,6" onKeyDown={this.preventSubmit} />
                <div onClick={this.createLotto} disabled={this.props.disabled} className="btn btn-lg btn-primary btn-block">수동 구매</div>
                {this.information()}
            </div>
        )
    }

}

export default LottoGenerator