import React, {Component} from "react";
import LottoPurchasePrinter from "./LottoPurchasePrinter";

class LottoPurchaseStatus extends Component {

    constructor(props) {
        super(props);
        this.onDeleteLotto = this.onDeleteLotto.bind(this);
    }

    onDeleteLotto(lottoIndex) {
        this.props.onDeleteLotto(lottoIndex);
    }

    render() {
        const lotto = this.props.lottoList.length == 0 ? <div></div> :
            <div className="form-show-div">
                <LottoPurchasePrinter
                    list={this.props.lottoList}
                    onDeleteLotto={this.onDeleteLotto}
                />
            </div>;
        return (
            <div className="form-show-div margin-bottom">
                <table className="table">
                    <tbody>
                        <tr>
                            <td>자동 : </td><td>{this.props.count - this.props.lottoList.length}</td><td>수동 : </td><td>{this.props.lottoList.length}</td>
                        </tr>
                    </tbody>
                </table>
                {lotto}
            </div>
        )
    }

}

export default LottoPurchaseStatus;