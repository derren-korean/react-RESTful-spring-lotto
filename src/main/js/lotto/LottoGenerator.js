import React, { Component } from "react";

import LottoSelector from "./LottoSelector";

class LottoGenerator extends Component{

    constructor(props) {
        super(props);
        this.createLotto = this.createLotto.bind(this);
    }

    createLotto(numbers) {
        if (this.props.disabled) return;
        this.props.addLotto(numbers);
    }

    render() {
        const showDisabled = this.props.disabled ?
        <div><span className="redColor">구매 금액을 추가하면 활성화 됩니다.</span></div> : <div></div>;
        return(
            <div>
                <LottoSelector onCreate={this.createLotto} disabled={this.props.disabled}/>
                {showDisabled}
            </div>
        )
    }

}

export default LottoGenerator