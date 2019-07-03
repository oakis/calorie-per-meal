import React from 'react';
import ReactDOM from 'react-dom';
import graphql from './helpers/graphql';

class App extends React.Component {

    state = {
        searchInput: '',
        searchResults: [],
    }

    boxWithShadow = {
        border: 'solid 1px #ccc',
        borderRadius: 5,
        boxShadow: '1px 1px 8px 0px #ccc',
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
        form: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        input: {
            flex: 1,
            padding: 15,
            fontSize: '1.2em',
            ...this.boxWithShadow,
        },
        button: {
            padding: '15px 45px',
            marginLeft: 8,
            fontSize: '1.2em',
            backgroundColor: 'steelblue',
            color: '#eee'
        },
        searchResults: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: 0,
            height: 300,
            overflowY: 'scroll',
            visibility: 'hidden',
            backgroundColor: '#f9f9f9',
            ...this.boxWithShadow,
            paddingInlineStart: 0,
            padding: '15px 0',
        },
        searchItem: {
            height: '1.5em',
            fontSize: '1em',
            listStyleType: 'none',
            cursor: 'pointer',
            padding: '5px 15px'
        },
    }

    formRef = React.createRef()

    formRefReady = () => (this.formRef && this.formRef.current !== null) === true;

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
        const searchResults = search.foodByName;
        console.log(`Found ${searchResults.length} foods.`, searchResults);
        this.setState({
            searchResults,
        });
    }

    onInputChange = (event) => this.setState({ searchInput: event.target.value });

    render() {
        const formRefReady = this.formRefReady();
        return (
            <div style={this.style.wrapper}>
                <h3 style={this.style.title}>GraphQL calorie calculator</h3>
                <br />
                <form
                    ref={this.formRef}
                    style={this.style.form}
                >
                    <input
                        style={this.style.input}
                        onChange={this.onInputChange}
                        value={this.state.searchInput}
                    />
                    <button onClick={this.foodByName} style={this.style.button}>Sök</button>
                </form>
                <br />
                <ul
                    style={
                        {
                            ...this.style.searchResults,
                            top: formRefReady ? (this.formRef.current.offsetTop + this.formRef.current.scrollHeight) : 0,
                            left: formRefReady ? this.formRef.current.offsetLeft : 0,
                            width: formRefReady ? this.formRef.current.scrollWidth : 0,
                            visibility: formRefReady && this.state.searchResults.length > 0 ? 'visible' : 'hidden',
                        }
                    }
                >
                    {this.state.searchResults.map(food => (
                        <li
                            key={food.number}
                            style={this.style.searchItem}
                            onMouseOver={e => {
                                e.currentTarget.style.backgroundColor = '#efefef';
                            }}
                            onMouseOut={e => {
                                e.currentTarget.style.backgroundColor = '';
                            }}
                        >{food.name}</li>
                    ))}
                </ul>
            </div>
        );
    }
};

ReactDOM.render(<App />, document.getElementById('wrapper'));
