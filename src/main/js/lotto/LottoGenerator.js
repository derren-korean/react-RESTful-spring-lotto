import React, { Component } from "react";
import LottoMachine from "./LottoMachine";

class LottoGenerator extends Component{
    render() {
        const showDisabled = this.props.disabled ?
        <div><span className="redColor">구매 금액을 추가하면 활성화 됩니다.</span></div> : <div></div>;
        return(
            <div>
                <LottoMachine addLotto={this.props.addLotto} disabled={this.props.disabled} btnSize="btn-lg"/>
                {showDisabled}
            </div>
        )
    }

}

export default LottoGenerator