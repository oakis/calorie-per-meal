import React, { Component, Fragment } from 'react';
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
            zIndex: 1,
        },
        searchItem: {
            height: '1.5em',
            fontSize: '1em',
            listStyleType: 'none',
            cursor: 'pointer',
            padding: '5px 15px',
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

    onInputChange = (event) => this.setState({ searchInput: event.target.value });

    render() {
        const {
            searchInput,
            searchResults,
        } = this.state;
        const formRefReady = this.formRefReady();
        return (
            <Fragment>
                <form
                    ref={this.formRef}
                    style={this.style.form}
                >
                    <input
                        placeholder="Sök..."
                        style={this.style.input}
                        onChange={this.onInputChange}
                        value={searchInput}
                    />
                    <Button
                        icon="search"
                        onClick={this.foodByName}
                    />
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
