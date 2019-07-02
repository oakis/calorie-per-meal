import React from 'react';
import ReactDOM from 'react-dom';
import graphql from './helpers/graphql';

class App extends React.Component {

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
        form: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        input: {
            flex: 1,
            padding: 15,
            fontSize: '1.2em',
            border: 'solid 1px #ccc',
            borderRadius: 5,
            boxShadow: '1px 1px 8px 0px #ccc',
        },
        button: {
            padding: '15px 45px',
            marginLeft: 8,
            fontSize: '1.2em',
            border: 'solid 1px #ccc',
            borderRadius: 5,
            boxShadow: '1px 1px 8px 0px #ccc',
            backgroundColor: 'steelblue',
            color: '#eee'
        },
    }

    state = {
        searchInput: '',
        searchResults: [],
    }

    foodByName = async (event) => {
        event.preventDefault();
        const search = await graphql(`
            query FindFood {
                foodByName(name: "${this.state.searchInput}") {
                    name
                    number
                    weight
                    group
                }
            }
        `);
        const searchResults = search.data.data.foodByName;
        console.log(`Found ${searchResults.length} foods.`, searchResults);
        this.setState({
            searchResults,
        });
    }

    onInputChange = (event) => this.setState({ searchInput: event.target.value });

    render() {
        return (
            <div style={this.style.wrapper}>
                <h3 style={this.style.title}>GraphQL calorie calculator</h3>
                <br />
                <form style={this.style.form}>
                    <input
                        style={this.style.input}
                        onChange={this.onInputChange}
                        value={this.state.searchInput}
                    />
                    <button onClick={this.foodByName} style={this.style.button}>Sök</button>
                </form>
                <br />
                <ul>
                    {this.state.searchResults.map(food => (
                        <li key={food.number}>{food.name}</li>
                    ))}
                </ul>
            </div>
        );
    }
};

ReactDOM.render(<App />, document.getElementById('wrapper'));
