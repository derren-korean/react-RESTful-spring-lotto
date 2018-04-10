import React, {Component} from "react";
import LottoNumber from "./LottoNumber";

const DEFAULT_ID = "createLotto";
const DEFAULT_MAX_LENGTH = 6;

const LOTTO_NUMBER_START = 1; // tabIndex에서 참고하고 있음.
const LOTTO_NUMBER_END = 45; // tabIndex에서 참고하고 있음.

const LOTTO_NUMBER_TABINDEX_OFFSET = 1;
const CREATE_BUTTON_TAB_INDEX = 2 + LOTTO_NUMBER_START+LOTTO_NUMBER_END;
const COLUMN_COUNT_OF_LOTTO_NUMBER = 10;

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
        this.keyUpHandle = this.keyUpHandle.bind(this);
        this.isModalDisplay = this.isModalDisplay.bind(this);
    }

    componentWillMount() {
        document.body.addEventListener('keyup', this.keyUpHandle, false);
    }

    componentDidMount() {
        this.initNumbers();
    }

    componentWillUnmount() {
        document.body.removeEventListener('keyup', this.keyUpHandle, false);
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

    isModalDisplay() {
        return window.location.hash == "#" + this.getModalId();
    }

    keyUpHandle(event) {
        if (!this.isModalDisplay()) return;
        if (event.key === 'Escape') {
            window.location = "#";
            return;
        }
        if (event.target.tabIndex < LOTTO_NUMBER_START) return;

        if (event.key === 'Enter' || event.key === ' ') {
            this.clickDOM(event);
            return;
        }

        if (event.key.startsWith('Arrow')) {
            this.moveFocus(event);
        }
    }

    clickDOM(event) {
        if (event.target.tabIndex == CREATE_BUTTON_TAB_INDEX) {
            this.handleSubmit(event);
            return;
        }
        const lottoNumber = Number(event.target.textContent);
        if (this.state.numbers[lottoNumber-LOTTO_NUMBER_TABINDEX_OFFSET].disabled) return;
        this.onNumberSelected(lottoNumber);
    }

    moveFocus(event) {
        let lottoNumberIndex = 0;
        if (event.target.tabIndex == LOTTO_NUMBER_START) {
            this.shiftFocus(lottoNumberIndex); // tab을 누른 것과 같은 효과
            return;
        }

        if (event.target.tabIndex == CREATE_BUTTON_TAB_INDEX) {
            return;
        }

        const lottoNumber = Number(event.target.textContent);
        if (event.key === 'ArrowUp') {
            lottoNumberIndex = this.calcIndex(lottoNumber, this.addIndex, -COLUMN_COUNT_OF_LOTTO_NUMBER);
        }
        if (event.key === 'ArrowDown') {
            lottoNumberIndex = this.calcIndex(lottoNumber, this.addIndex, COLUMN_COUNT_OF_LOTTO_NUMBER);
        }
        if (event.key === 'ArrowLeft') {
            lottoNumberIndex = this.calcIndex(lottoNumber, this.addIndex, -1);
        }
        if (event.key === 'ArrowRight') {
            lottoNumberIndex = this.calcIndex(lottoNumber, this.addIndex, 1);
        }
        this.shiftFocus(lottoNumberIndex);
    }

    addIndex(index, number) {
        return index + number;
    }

    calcIndex(lottoNumber, method, targetNumber) {
        if (typeof method !== 'function') return;
        lottoNumber = method(lottoNumber, targetNumber);
        if (lottoNumber < LOTTO_NUMBER_START || lottoNumber > LOTTO_NUMBER_END) {
            lottoNumber = this.ceilCalc(lottoNumber);
        }
        while (lottoNumber < LOTTO_NUMBER_START || lottoNumber > LOTTO_NUMBER_END) {
            lottoNumber = method(lottoNumber, targetNumber);
        }
        return lottoNumber-LOTTO_NUMBER_TABINDEX_OFFSET;
    }

    ceilCalc(lottoNumber) {
        if (lottoNumber < LOTTO_NUMBER_START) {
            return lottoNumber += this.getCeilNumber(LOTTO_NUMBER_END);
        }
        return lottoNumber -= this.getCeilNumber(LOTTO_NUMBER_END);
    }

    // 한자리 아래에서 올림을 한다. ex) 45 -> 50
    getCeilNumber(number) {
        const numberArr = String(number).split('');
        if (numberArr.length == 1) {
            return Math.ceil(number);
        }
        const _ceil = Number(numberArr[0]+numberArr[1])+9;
        return Number(String(_ceil).split('')[0]) * Math.pow(10, numberArr.length-1);

    }

    shiftFocus(index) {
        document.getElementById(this.getModalId()).getElementsByClassName('selectMode')[index].focus();
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
                            {this.state.numbers.map((LNumber, index)=>
                                <LottoNumber key={index}
                                             tabIndex={LOTTO_NUMBER_TABINDEX_OFFSET+index+LOTTO_NUMBER_START} //start
                                             number={LNumber.number}
                                             selectMode={true}
                                             onSelected={this.onNumberSelected}
                                             selected={LNumber.selected}
                                             disabled={LNumber.disabled}
                                />
                            )}
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