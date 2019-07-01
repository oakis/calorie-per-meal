import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    render() {
        return (
            <h3>React JSX</h3>
        );
    }
};

ReactDOM.render(<App />, document.getElementById('wrapper'));
