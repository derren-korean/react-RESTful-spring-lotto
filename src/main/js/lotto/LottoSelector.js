import React, {Component} from "react";
import LottoNumber from "./LottoNumber";

const LOTTO_NUMBER_START = 1;
const LOTTO_NUMBER_END = 45;

const MAX_LOTTO_NUMBER = 6;

class LottoSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numbers: []
        };
        this.openModal = this.openModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onNumberSelected = this.onNumberSelected.bind(this);
        this.initNumbers = this.initNumbers.bind(this);
        this.isFull = this.isFull.bind(this);
    }

    componentDidMount() {
        this.initNumbers();
    }

    initNumbers() {
        let numbers = [];
        for(let number = LOTTO_NUMBER_START; number <= LOTTO_NUMBER_END; number++) {
            numbers.push(this.createNumber(number, false, false));
        }
        this.setState({
            numbers: numbers
        })
    }

    openModal() {
        if (this.props.disabled) return;
        window.location = "#createLotto";
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.isFull()) {
            alert(MAX_LOTTO_NUMBER+"개 숫자를 선택해주세요.");
            return;
        }
        this.props.onCreate(this.state.numbers.filter(LNumber=>LNumber.selected).map(LNumber=>LNumber.number));
        this.initNumbers();
        window.location = "#";
    }

    onNumberSelected(number) {
        this.setState({
            numbers: this.changeSelectedInList(number)
        });
        if (this.isFull()) {
            this.setDisabled();
            return;
        }
        if (this.state.numbers.find(LNumber=>LNumber.disabled)) {
            this.setAble();
        }
    }

    isFull() {
        return this.state.numbers.filter(LNumber=>LNumber.selected).length == MAX_LOTTO_NUMBER;
    }

    changeSelectedInList(number) {
        let numbers = this.state.numbers;
        numbers[number-1].selected = !numbers[number-1].selected;
        return numbers;
    }

    setDisabled() {
        let numbers = this.state.numbers;
        numbers.forEach((LNumber, index) => {
            if (!LNumber.selected) {
                LNumber.disabled = true;
            }
        });
        this.setState({
            numbers: numbers
        })
    }

    setAble() {
        let numbers = this.state.numbers;
        numbers.forEach((LNumber, index) => {
            LNumber.disabled = false;
        });
        this.setState({
            numbers: numbers
        })
    }

    createNumber(number, selected, disabled) {
        return {number: number, selected: selected, disabled: disabled}
    }

    getSelected() {
        const numbers = this.state.numbers.filter(LNumber=>LNumber.selected);
        return numbers ? numbers : [];
    }

    render() {
        const selectedNumbers = this.getSelected();
        let selectButton = "btn btn-primary ";
        selectButton += this.props.btnSize ? this.props.btnSize : "btn-block";
        return (
            <div className="lottoSelector">
                <div className={selectButton} onClick={this.openModal} disabled={this.props.disabled}>번호 선택</div>

                <div id="createLotto" className="modalDialog">
                    <div>
                        <div className="margin-bottom">
                            <a href="#" title="Close" className="close">X</a>
                            <h2>로또 번호 선택</h2>
                        </div>
                        <div className="margin-bottom">
                            <span className="statusFont">선택한 번호 : </span>
                            {selectedNumbers.map((LNumber,index) =>
                                <LottoNumber
                                    key={index}
                                    number={LNumber.number}
                                />
                            )}
                        </div>
                        <div className="margin-bottom">
                            {this.state.numbers.map((LNumber, index)=>
                                <LottoNumber
                                    key={index}
                                    number={LNumber.number}
                                    onSelected={this.onNumberSelected}
                                    selectMode={true}
                                    selected={LNumber.selected}
                                    disabled={LNumber.disabled}
                                />
                            )}
                        </div>
                        <div>
                            <button className="btn btn-block" onClick={this.handleSubmit}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LottoSelector