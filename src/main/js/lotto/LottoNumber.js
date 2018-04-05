import React, {Component} from "react";

const MIN_NUMBER = 1;
const MAX_NUMBER = 45;

const COLOR_INDEX_ARR = [10,20,30,40,45];

class LottoNumber extends Component {

    invalid(number) {
        if (!number || number.length == 0) return true;
        const _number = Number(number);
        if (Number.isNaN(_number)) return true;
        if (!Number.isInteger(_number)) return true;
        if (_number < MIN_NUMBER || _number > MAX_NUMBER) return true;
        return false;
    }

    getColor(number) {
        const _number = Number(number);
        for(let i = 0; i < COLOR_INDEX_ARR.length; i++) {
            if (_number <= COLOR_INDEX_ARR[i]) {
                return COLOR_INDEX_ARR[i];
            }
        }
    }

    render() {
        if (this.invalid(this.props.number)) return <span>?</span>;
        const className = "lottoNumber lottoNumberBelow" + this.getColor(this.props.number);
        return(
            <span className={className}>
                {this.props.number}
            </span>
        )
    }
}

export default LottoNumber