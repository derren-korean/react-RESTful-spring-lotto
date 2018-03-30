import React, { Component } from "react";

class Result extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        //todo : 일치하는 여부 및 금액에 대한 정보 가져오기
        //todo : 해당 매칭 가져오기
        //todo : 총 수익률 가져오기
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.initClientAndServer();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="form-result">
                    <div className="submit-button">
                        <button className="btn btn-lg btn-primary btn-block" type="submit" value="Submit">다시 하기</button>
                    </div>
                </form>
                <pre className="pre-scrollable">
                    <table className="table">
                        <thead>
                            <tr><th><h3 className="text-center">당첨 통계</h3></th>
                        </tr></thead>
                        <tbody>
                            <tr><th>3개 일치 (5000원)- 0개</th></tr>
                            <tr><th>4개 일치 (50000원)- 0개</th></tr>
                            <tr><th>5개 일치 (1500000원)- 0개</th></tr>
                            <tr><th>5개 일치 보너스 볼 일치(30000000원)- 0개</th></tr>
                            <tr><th>6개 일치 (2000000000원)- 0개</th></tr>
                        </tbody>
                        <tfoot>
                            <tr><th><h4 className="text-center">총 수익률은 0%입니다.</h4></th>
                        </tr></tfoot>
                    </table>
                </pre>
            </div>
        );
    }
}

export default Result;