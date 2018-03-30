import React, {Component} from "react";
import LottoTrPrinter from "./LottoTrPrinter";

class LottoListPrinter extends Component {
    render() {
        return (
            <table className="table">
                <thead>
                <tr><th></th>
                    <th className="text-center">로또 번호</th>
                </tr></thead>
                <tbody>
                {this.props.lottoList.map((lotto, index) =>
                    <LottoTrPrinter key={lotto.toString()+index}
                                    lotto={lotto}
                                    index={index}
                    />
                )}
                </tbody>
            </table>
        )
    }
}

export default LottoListPrinter