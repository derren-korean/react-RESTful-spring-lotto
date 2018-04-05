import React, {Component} from "react";

const MIN_NUMBER = 1;
const MAX_NUMBER = 45;

const BELOW_10 = "#fbb52e";

const BELOW_20 = "#2e7dd6";
const BELOW_30 = "#f83622";
const BELOW_40 = "#6f7070";
const BELOW_45 = "#51b00d";
const COLOR_INDEX_ARR = [10,20,30,40,45];

const COLORS = [{10:BELOW_10}, {20:BELOW_20}, {30:BELOW_30}, {40:BELOW_40}, {45:BELOW_45}];

class LottoNumber extends Component {

    constructor(props) {
        super(props);
        if (this.invalid(this.props.number)) {
            return;
        }
    }



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
            if (_number < COLOR_INDEX_ARR[i]) {
                return COLORS[i][COLOR_INDEX_ARR[i]];
            }
        }
    }

    render() {
        const ratio = "50%";
        const padding = "3px";
        const fontColor = "#fff";
        if (this.invalid(this.props.number)) return <span>?</span>
        const color = this.getColor(this.props.number);
        return(
            <span style={{borderRadius: ratio, backgroundColor: color, color: fontColor, padding: padding}}>
                {this.props.number}
            </span>
        )
    }
}

export default LottoNumber