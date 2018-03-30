import React, {Component} from "react";

class LottoTrPrinter extends Component {
    render() {
        return (
            <tr>
                <th className="text-center">{this.props.index+1}</th>
                <td className="text-center">{this.props.lotto.toString()}</td>
            </tr>
        )
    }
}

export default LottoTrPrinter