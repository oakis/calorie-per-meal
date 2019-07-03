import React from 'react';
import ReactDOM from 'react-dom';
import { SelectedItem, SearchByName, Recipe } from './components';

class App extends React.Component {

    state = {
        recipes: [],
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

    addItem = (item) => {
        this.setState((state, props) => ({
            recipes: [...state.recipes, item]
        }));
    }

    onItemClick = ({ selectedItem }) => {
        this.setState({
            selectedItem,
        });
    }

    render() {
        const {
            recipes,
            selectedItem,
        } = this.state;
        return (
            <div style={this.style.wrapper}>
                <h3 style={this.style.title}>GraphQL calorie calculator</h3>
                <br />
                <SearchByName onItemClick={this.onItemClick} />
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
                    {recipes.length > 0 &&
                        <Recipe data={recipes} />
                    }
                    {selectedItem.name !== undefined &&
                        <SelectedItem data={selectedItem} addItem={this.addItem} />
                    }
                </div>
            </div>
        );
    }
};

ReactDOM.render(<App />, document.getElementById('wrapper'));
