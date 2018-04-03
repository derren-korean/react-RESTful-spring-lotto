import React, {Component} from "react";

class ResultPrinter extends Component {

    render() {
        const KEY = "JECKPOT";

        if (this.props.result.hasOwnProperty(KEY) || this.props.lottoRank.length == 0) {
            return <div></div>
        }
        return(
            <pre className="pre-scrollable">
                <table className="table">
                    <thead>
                    <tr><th><h3 className="text-center">당첨 통계</h3></th>
                    </tr></thead>
                    <tbody>
                        {this.props.lottoRank.map((rank) =>
                            <ResultTrPrinter key={rank.name}
                                             rank={rank}
                                             result={this.props.result}
                            />
                        )}
                    </tbody>
                    <tfoot>
                    <tr><th><h4 className="text-center">총 수익률은 {Number(this.props.profit).toLocaleString()}%입니다.</h4></th>
                    </tr></tfoot>
                </table>
            </pre>
        )
    }

}

class ResultTrPrinter extends Component {
        render() {
        return (
            <tr>
                <th className="text-center">
                    {this.props.rank.matchingCount}개 일치 ({this.props.rank.price.toLocaleString()}원)- {this.props.result[this.props.rank.name]}
                </th>
            </tr>
        )
    }
}

export default ResultPrinter