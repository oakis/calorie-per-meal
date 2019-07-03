import React from 'react';
import ReactDOM from 'react-dom';
import { SelectedItem } from './components';
import SearchByName from './components/Search/SearchByName.jsx';

class App extends React.Component {

    state = {
        selectedItem: {},
    }

    style = {
        wrapper: {
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            fontFamily: 'Product Sans Regular',
            width: '80%',
            margin: 'auto',
        },
        title: {
            fontFamily: 'Product Sans Black Regular',
            fontSize: '2.5em',
            fontWeight: 'bold',
            textAlign: 'center',
        },
    }

    onItemClick = ({ selectedItem }) => {
        this.setState({
            selectedItem,
        });
    }

    render() {
        const {
            selectedItem,
        } = this.state;
        
        return (
            <div style={this.style.wrapper}>
                <h3 style={this.style.title}>GraphQL calorie calculator</h3>
                <br />
                <SearchByName onItemClick={this.onItemClick} />
                {selectedItem.name !== undefined &&
                    <SelectedItem data={selectedItem} />
                }
            </div>
        );
    }
};

ReactDOM.render(<App />, document.getElementById('wrapper'));
