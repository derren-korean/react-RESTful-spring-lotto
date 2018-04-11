import React, {Component} from "react";
import LottoNumber from "./LottoNumber";

const COLUMN_COUNT_OF_LOTTO_NUMBER = 10; // need to check on display

class LottoSelectPanel extends Component {

    constructor(props) {
        super(props);
        this.keyUpHandle = this.keyUpHandle.bind(this);
        this.isModalDisplay = this.isModalDisplay.bind(this);
    }

    componentWillMount() {
        document.body.addEventListener('keyup', this.keyUpHandle, false);
    }

    componentWillUnmount() {
        document.body.removeEventListener('keyup', this.keyUpHandle, false);
    }

    keyUpHandle(event) {
        if (!this.isModalDisplay()) return;
        if (event.key === 'Escape') {
            window.location = "#";
            return;
        }
        if (event.target.tabIndex < this.props.startNumber) return;

        if (event.key === 'Enter' || event.key === ' ') {
            this.clickDOM(event);
            return;
        }

        if (event.key.startsWith('Arrow')) {
            this.moveFocus(event);
        }
    }

    isModalDisplay() {
        return window.location.hash == "#" + this.props.modalId;
    }

    clickDOM(event) {
        if (event.target.tabIndex == this.props.buttonIndex) {
            this.props.handleSubmit(event);
            return;
        }
        const lottoNumber = Number(event.target.textContent);
        if (this.props.numbers[lottoNumber-this.props.indexOffset].disabled) return;
        this.props.onNumberSelected(lottoNumber);
    }

    moveFocus(event) {
        let lottoNumberIndex = 0;
        if (event.target.tabIndex == this.props.startNumber) {
            this.shiftFocus(lottoNumberIndex); // tab을 누른 것과 같은 효과
            return;
        }

        if (event.target.tabIndex == this.props.buttonIndex) {
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
        if (lottoNumber < this.props.startNumber || lottoNumber > this.props.endNumber) {
            lottoNumber = this.ceilCalc(lottoNumber);
        }
        while (lottoNumber < this.props.startNumber || lottoNumber > this.props.endNumber) {
            lottoNumber = method(lottoNumber, targetNumber);
        }
        return lottoNumber-this.props.indexOffset;
    }

    ceilCalc(lottoNumber) {
        if (lottoNumber < this.props.startNumber) {
            return lottoNumber += this.getCeilNumber(this.props.endNumber);
        }
        return lottoNumber -= this.getCeilNumber(this.props.endNumber);
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
        document.getElementById(this.props.modalId).getElementsByClassName('selectMode')[index].focus();
    }

    getListRender() {
        return this.props.numbers.map((LNumber, index)=> {
            if (LNumber.number % COLUMN_COUNT_OF_LOTTO_NUMBER == 0) {
                return <LottoNumber key={index}
                                    number={LNumber.number}
                                    lastNumber={true}
                                    tabIndex={this.props.indexOffset + index + this.props.startNumber} //start
                                    selectMode={true}
                                    onSelected={this.props.onNumberSelected}
                                    selected={LNumber.selected}
                                    disabled={LNumber.disabled}
                />
            }
            return <LottoNumber key={index}
                                number={LNumber.number}
                                tabIndex={this.props.indexOffset + index + this.props.startNumber} //start
                                selectMode={true}
                                onSelected={this.props.onNumberSelected}
                                selected={LNumber.selected}
                                disabled={LNumber.disabled}
            />
        })
    }

    render() {
        if (this.props.numbers.length == 0) return <div></div>;
        return(
            <div>
                {this.getListRender()}
            </div>
        )
    }
}

export default LottoSelectPanel