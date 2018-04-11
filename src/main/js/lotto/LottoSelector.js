import React, {Component} from "react";
import LottoNumber from "./LottoNumber";
import LottoSelectPanel from "./LottoSelectPanel";

const DEFAULT_ID = "createLotto";
const DEFAULT_MAX_LENGTH = 6;

const LOTTO_NUMBER_START = 1; // tabIndex에서 참고하고 있음.
const LOTTO_NUMBER_END = 45; // tabIndex에서 참고하고 있음.

const LOTTO_NUMBER_TABINDEX_OFFSET = 1;
const CREATE_BUTTON_TAB_INDEX = 2 + LOTTO_NUMBER_START+LOTTO_NUMBER_END;

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
        this.getModalId = this.getModalId.bind(this);
        this.getMaxLength = this.getMaxLength.bind(this);
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

    getModalId() {
        return this.props.id ? DEFAULT_ID + this.props.id : DEFAULT_ID;
    }

    openModal() {
        if (this.props.disabled) return;
        window.location = "#"+this.getModalId();
    }

    getMaxLength() {
        return this.props.maxLength ? this.props.maxLength : DEFAULT_MAX_LENGTH;
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.isFull()) {
            alert(this.getMaxLength()+"개 숫자를 선택해주세요.");
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
        return this.state.numbers.filter(LNumber=>LNumber.selected).length == this.getMaxLength();
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
        });
    }

    setAble() {
        let numbers = this.state.numbers;
        numbers.forEach((LNumber, index) => {
            LNumber.disabled = false;
        });
        this.setState({
            numbers: numbers
        });
    }

    createNumber(number, selected, disabled) {
        return {number: number, selected: selected, disabled: disabled};
    }

    getSelected() {
        const numbers = this.state.numbers.filter(LNumber=>LNumber.selected);
        return numbers ? numbers : [];
    }

    render() {
        let selectButton = "btn btn-primary ";
        selectButton += this.props.btnSize ? this.props.btnSize : "btn-block";
        const buttonText = this.props.buttonText ? this.props.buttonText : "번호 선택";
        return (
            <div className="lottoSelector">
                <div className={selectButton} onClick={this.openModal} disabled={this.props.disabled}>{buttonText}</div>

                <div id={this.getModalId()} className="modalDialog">
                    <div>
                        <div className="margin-bottom">
                            <a href="#" title="Close" className="close" tabIndex={LOTTO_NUMBER_START}>X</a>
                            <h2>로또 번호 선택</h2>
                        </div>
                        <div className="margin-bottom">
                            <span className="statusFont">선택한 번호 : </span>
                            {this.getSelected().map((LNumber,index) =>
                                <LottoNumber
                                    key={index}
                                    number={LNumber.number}
                                />
                            )}
                        </div>
                        <div className="margin-bottom">
                            <LottoSelectPanel
                                numbers={this.state.numbers}
                                startNumber={LOTTO_NUMBER_START}
                                endNumber={LOTTO_NUMBER_END}
                                indexOffset={LOTTO_NUMBER_TABINDEX_OFFSET}
                                buttonIndex={CREATE_BUTTON_TAB_INDEX}
                                modalId={this.getModalId()}
                                onNumberSelected={this.onNumberSelected}
                                handleSubmit={this.handleSubmit}
                            />
                        </div>
                        <div>
                            <div className="btn btn-block modalButton" onClick={this.handleSubmit} tabIndex={CREATE_BUTTON_TAB_INDEX}>생성 하기</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LottoSelector