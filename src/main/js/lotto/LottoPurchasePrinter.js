import React, {Component} from "react";
import Lotto from "./Lotto";

class LottoPurchasePrinter extends Component {

    constructor(props) {
        super(props);
        this.onDeleteLotto = this.onDeleteLotto.bind(this);
    }

    onDeleteLotto(event) {
        this.props.onDeleteLotto(event.target.getAttribute('index'));
    }

    render() {
        return (
            <table className="table">
                <tbody>
                <tr>
                    <th colSpan="2" style={{textAlign: "center"}}>수동 입력</th>
                </tr>
                {this.props.list.map((numberList, index) =>
                    <tr key={numberList.toString()+index}>
                        <td style={{textAlign: "center"}}><Lotto lotto={numberList}/></td>
                        <td onClick={this.onDeleteLotto} className="text-center delete-div" index={index}>X</td>
                    </tr>
                )}
                </tbody>
            </table>
        )
    }
}

export default LottoPurchasePrinter