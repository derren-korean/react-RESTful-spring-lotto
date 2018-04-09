import React, {Component} from "react";
import Lotto from "./Lotto";

class LottoTrPrinter extends Component {
    render() {
        return (
            <tr>
                <th className="text-center">{this.props.index+1}</th>
                <td className="text-center"><Lotto lotto={this.props.lotto} /></td>
            </tr>
        )
    }
}

export default LottoTrPrinter