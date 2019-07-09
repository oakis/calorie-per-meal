import React, { Component, Fragment } from 'react';
import MaterialIcon from 'material-icons-react';
import Button from '../common/Button.jsx';
import graphql from '../../helpers/graphql';
import styles from '../../styles';

export class SearchByName extends Component {
    state = {
        searchInput: '',
        searchResults: [],
    }

    style = {
        form: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        input: {
            flex: 1,
            padding: 15,
            fontSize: '1.2em',
            ...styles.boxWithShadow,
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
            ...styles.boxWithShadow,
            paddingInlineStart: 0,
            padding: '15px 0',
            margin: '-2px 0 0 0',
            zIndex: 1,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
        },
        searchItem: {
            height: '1.5em',
            fontSize: '1em',
            listStyleType: 'none',
            cursor: 'pointer',
            padding: '5px 15px',
        },
    }

    inputRef = React.createRef()

    inputRefReady = () => (this.inputRef && this.inputRef.current !== null) === true;

    foodByName = async (event) => {
        event.preventDefault();
        const search = await graphql(`
            query FindFood {
                foods(name: "${this.state.searchInput}") {
                    name
                    number
                }
            }
        `);
        const searchResults = search.foods;
        console.log(`Found ${searchResults.length} foods.`, searchResults);
        this.setState({
            searchResults,
        });
    }

    onInputChange = (event) => this.setState({ searchInput: event.target.value });

    render() {
        const {
            searchInput,
            searchResults,
        } = this.state;
        const inputRefReady = this.inputRefReady();
        return (
            <Fragment>
                <form
                    style={this.style.form}
                >
                    <input
                        ref={this.inputRef}
                        placeholder="Sök..."
                        style={this.style.input}
                        onChange={this.onInputChange}
                        value={searchInput}
                    />
                    <Button
                        onClick={this.foodByName}
                        color="steelblue"
                    >
                        <MaterialIcon icon="search" size="small" color="#eee" />
                    </Button>
                </form>
                <br />
                <ul
                    style={
                        {
                            ...this.style.searchResults,
                            top: inputRefReady ? (this.inputRef.current.offsetTop + this.inputRef.current.scrollHeight) : 0,
                            left: inputRefReady ? this.inputRef.current.offsetLeft : 0,
                            width: inputRefReady ? this.inputRef.current.scrollWidth : 0,
                            visibility: inputRefReady && searchResults.length > 0 ? 'visible' : 'hidden',
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
                            onClick={(e) => {
                                e.stopPropagation();
                                this.props.onItemClick(food.number);
                                this.setState({
                                    searchInput: '',
                                    searchResults: [],
                                })
                            }}
                        >{food.name}</li>
                    ))}
                </ul>
            </Fragment>
        );
    };
}
