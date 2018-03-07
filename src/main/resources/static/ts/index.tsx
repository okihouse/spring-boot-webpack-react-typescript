import * as React from "react";
import * as ReactDOM from "react-dom";

interface IndexProps {
}

interface IndexState {
}

class Index extends React.Component<IndexProps, IndexState> {
    constructor(props: IndexProps) {
        super(props);
        this.state = {
        };
    }

    render(): JSX.Element {
        return (
            <div className="App">
                <header className="App-header">
                    <div src="" className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

ReactDOM.render(
    <Index />,
    document.getElementById('container')
);