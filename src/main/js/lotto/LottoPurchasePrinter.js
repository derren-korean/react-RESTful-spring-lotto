import React, {Component} from "react";

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
                    <th colSpan="2">수동 입력</th>
                </tr>
                {this.props.list.map((number, index) =>
                    <tr key={number.toString()+index}>
                        <td>{number}</td><td className="text-center delete-div" index={index} onClick={this.onDeleteLotto}>X</td>
                    </tr>
                )}
                </tbody>
            </table>
        )
    }
}

export default LottoPurchasePrinter