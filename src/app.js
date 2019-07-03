import React from 'react';
import ReactDOM from 'react-dom';
import graphql from './helpers/graphql';
import MaterialIcon from 'material-icons-react';

class App extends React.Component {

    state = {
        searchInput: '',
        searchResults: [],
        selectedItem: {},
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
            display: 'flex',
            padding: '15px 20px',
            marginLeft: 8,
            fontSize: '1.2em',
            backgroundColor: 'steelblue',
            color: '#eee',
            whiteSpace: 'nowrap',
            ...this.boxWithShadow,
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
            padding: '5px 15px',
        },
        selectedItem: {
            wrapper: {
                alignSelf: 'flex-end',
                width: '50%',
                padding: 15,
                ...this.boxWithShadow,
            },
            header: {
                wrapper: {
                    display: 'flex',
                    justifyContent: 'space-between',
                }
            },
            name: {
                fontSize: '1.5em',
                marginBottom: 8,
            },
            table: {
                width: '100%',
                textAlign: 'left',
                marginTop: 15,
                borderCollapse: 'collapse',
            },
            th: {
                borderBottom: '1px solid #555',
                padding: '1px 0px',
            },
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
                }
            }
        `);
        const searchResults = search.foodByName;
        console.log(`Found ${searchResults.length} foods.`, searchResults);
        this.setState({
            searchResults,
        });
    }

    foodById = async (event) => {
        event.preventDefault();
        const { foodById } = await graphql(`
            query GetFoodById {
                foodById(number: "${event.currentTarget.dataset.id}") {
                    name
                    number
                    weight
                    group
                    nutrition {
                        name
                        value
                        unit
                    }
                }
            }
        `);
        console.log('Found item', foodById[0]);
        return foodById[0];
    }

    onInputChange = (event) => this.setState({ searchInput: event.target.value });

    onItemClick = async (event) => {
        this.setState({
            selectedItem: await this.foodById(event),
            searchResults: [],
        });
    }

    render() {
        const {
            searchInput,
            searchResults,
            selectedItem,
        } = this.state;
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
                        value={searchInput}
                    />
                    <button onClick={this.foodByName} style={this.style.button}>
                        <MaterialIcon icon="search" size="large" />
                    </button>
                </form>
                <br />
                <ul
                    style={
                        {
                            ...this.style.searchResults,
                            top: formRefReady ? (this.formRef.current.offsetTop + this.formRef.current.scrollHeight) : 0,
                            left: formRefReady ? this.formRef.current.offsetLeft : 0,
                            width: formRefReady ? this.formRef.current.scrollWidth : 0,
                            visibility: formRefReady && searchResults.length > 0 ? 'visible' : 'hidden',
                        }
                    }
                >
                    {searchResults.map(food => (
                        <li
                            key={food.number}
                            style={this.style.searchItem}
                            onMouseOver={e => {
                                e.currentTarget.style.backgroundColor = '#efefef';
                            }}
                            onMouseOut={e => {
                                e.currentTarget.style.backgroundColor = '';
                            }}
                            onClick={this.onItemClick}
                            data-id={food.number}
                        >{food.name}</li>
                    ))}
                </ul>
                {selectedItem.name !== undefined &&
                    <div style={this.style.selectedItem.wrapper}>
                        <div style={this.style.selectedItem.header.wrapper}>
                            <div style={this.style.selectedItem.header.left}>
                                <div style={this.style.selectedItem.name}>{selectedItem.name}</div>
                                <div><em>Vikt: {selectedItem.weight}g</em></div>
                                <div><em>Grupp: {selectedItem.group}</em></div>
                            </div>
                            <div style={this.style.selectedItem.header.right}>
                                <button style={this.style.button}>
                                    <MaterialIcon icon="add" size="large" />
                                </button>
                            </div>
                        </div>
                        <table style={this.style.selectedItem.table}>
                            <thead>
                                <tr>
                                    <th style={this.style.selectedItem.th}>Namn</th>
                                    <th style={this.style.selectedItem.th}>Värde</th>
                                    <th style={this.style.selectedItem.th}>Enhet</th>
                                </tr>
                            </thead>
                            <tbody>
                            {selectedItem.nutrition.map(item => (
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.value}</td>
                                    <td>{item.unit}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        );
    }
};

ReactDOM.render(<App />, document.getElementById('wrapper'));
