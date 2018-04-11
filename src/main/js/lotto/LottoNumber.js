import React, {Component} from "react";

const MIN_NUMBER = 1;
const MAX_NUMBER = 45;

const COLOR_INDEX_ARR = [10,20,30,40,45];

class LottoNumber extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addClassName = this.addClassName.bind(this);
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
            if (_number <= COLOR_INDEX_ARR[i]) {
                return COLOR_INDEX_ARR[i];
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.props.onSelected) {
            if (this.props.disabled) return;
            this.props.onSelected(this.props.number);
        }
    }

    addClassName(className) {
        if (this.props.disabled) {
            className += " disabled";
        }
        if (this.props.selected) {
            className += " selected";
        }
        return className + " selectMode";
    }

    selectModeRender(className) {
        className = this.addClassName(className);
        return (
            <span className={className} onClick={this.handleSubmit} tabIndex={this.props.tabIndex}>
                {this.props.number}
            </span>
        )
    }

    render() {
        if (this.invalid(this.props.number)) return <span>?</span>;
        const noMarginRight = this.props.lastNumber ? " noMarginRight" : "";
        const className = "lottoNumber lottoNumberBelow" + this.getColor(this.props.number) + noMarginRight;
        if (this.props.selectMode) {
            return this.selectModeRender(className);
        }

        return(
            <span className={className} onClick={this.handleSubmit}>
                {this.props.number}
            </span>
        )
    }
}

export default LottoNumber