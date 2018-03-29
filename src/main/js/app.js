import React from 'react';
import ReactDOM from 'react-dom';

import {
    Route,
    BrowserRouter
} from "react-router-dom";

import Buy from "./lotto/Buy";
import Match from "./lotto/Match";
import Result from "./lotto/Result";
import CustomNavLink from "./ui/CustomNavLink";

const root = "/api";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            buy: true,
            match: true,
            result: true,
        };
        this.goToLink = this.goToLink.bind(this);
        this.activeNextStep = this.activeNextStep.bind(this);
        this.initClientAndServer = this.initClientAndServer.bind(this);
    }
    componentDidMount() {
        this.activeNextStep("buy");
    }

    goToLink(e, disabled) {
        if (disabled) {
            e.preventDefault();
        }
    }
    activeNextStep(target) {
        this.setState({
            [target]:false
        });
        if ('buy' == target) {
            this.initClientAndServer();
        }
    }
    initClientAndServer() {
        this.setState({
            match: true,
            result: true
        });

    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <h1>Lotto SPA</h1>
                    <ul className="header">
                        <CustomNavLink goToLink={this.goToLink} disabled={this.state.buy} to="/buy" text="로또 구매" />
                        <CustomNavLink goToLink={this.goToLink} disabled={this.state.match} to="/match" text="당첨 번호" />
                        <CustomNavLink goToLink={this.goToLink} disabled={this.state.result} to="/result" text="결과 확인" />
                    </ul>
                    <div className="content">
                        <Route path="/buy"
                               component={(props) => (
                                   <Buy {...props}
                                        root={root}
                                        nextStep="match"
                                        activeNextStep={this.activeNextStep}
                                    />
                       )}/>
                        <Route path="/match" component={(props) => (
                            <Match
                                {...props}
                                root={root}
                                nextStep="result"
                                activeNextStep={this.activeNextStep}
                            />
                        )}/>
                        <Route path="/result" component={(props) => (
                            <Result
                                {...props}
                                root={root}
                                nextStep="buy"
                                activeNextStep={this.activeNextStep}
                            />
                        )}/>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)