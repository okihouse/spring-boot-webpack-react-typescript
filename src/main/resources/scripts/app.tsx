import * as React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

require('../styles/Index.scss');

interface AppProps {
}

interface AppState {
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
        };
    }

    render(): JSX.Element {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="App-logo"></div>
                    <h1 className="App-title">Welcome to React and Typescript</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>index.tsx</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default hot(App);