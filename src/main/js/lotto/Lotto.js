import React, {Component} from "react";
import LottoNumber from "./LottoNumber";

class Lotto extends Component {

    render () {
        if (!this.props.numberList || this.props.numberList.length == 0) return <span></span>;
        return (
            <div>
                <LottoNumber number={this.props.numberList[0]}/>
                <LottoNumber number={this.props.numberList[1]}/>
                <LottoNumber number={this.props.numberList[2]}/>
                <LottoNumber number={this.props.numberList[3]}/>
                <LottoNumber number={this.props.numberList[4]}/>
                <LottoNumber number={this.props.numberList[5]}/>
            </div>
        )
    }

}

export default Lotto