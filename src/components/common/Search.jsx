import React, { Component, Fragment } from 'react';
import MaterialIcon from 'material-icons-react';
import Button from '../common/Button.jsx';
import styles from '../../styles';

class Search extends Component {
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
            margin: 0,
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

    inputRef = React.createRef()

    inputRefReady = () => (this.inputRef && this.inputRef.current !== null) === true;

    onInputChange = (event) => this.setState({ searchInput: event.target.value });

    render() {
        const { placeholder = 'Sök...' } = this.props;
        const {
            searchInput,
            searchResults,
        } = this.state;
        const inputRefReady = this.inputRefReady();
        const distanceToTop = inputRefReady && window.innerHeight - (this.inputRef.current.offsetTop + this.inputRef.current.scrollHeight);
        const shouldPlaceUnderInput = inputRefReady && Math.min(distanceToTop, window.innerHeight / 2) < distanceToTop;
        return (
            <Fragment>
                <form
                    style={this.style.form}
                >
                    <input
                        ref={this.inputRef}
                        placeholder={placeholder}
                        style={this.style.input}
                        onChange={this.onInputChange}
                        value={searchInput}
                    />
                    <Button
                        onClick={async (event) => {
                            event.preventDefault();
                            const searchResults = await this.props.onSearch(searchInput);
                            this.setState({
                                searchResults,
                            });
                        }}
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
                            top: inputRefReady && shouldPlaceUnderInput ? (this.inputRef.current.offsetTop + this.inputRef.current.scrollHeight) - 2 : null,
                            bottom: inputRefReady && !shouldPlaceUnderInput ? (window.innerHeight - this.inputRef.current.offsetTop) - 2 : null,
                            left: inputRefReady ? this.inputRef.current.offsetLeft : 0,
                            width: inputRefReady ? this.inputRef.current.scrollWidth : 0,
                            visibility: inputRefReady && searchResults.length > 0 ? 'visible' : 'hidden',
                            borderTopLeftRadius: shouldPlaceUnderInput ? 0 : 5,
                            borderTopRightRadius: shouldPlaceUnderInput ? 0 : 5,
                            borderBottomLeftRadius: !shouldPlaceUnderInput ? 0 : 5,
                            borderBottomRightRadius: !shouldPlaceUnderInput ? 0 : 5,
                        }
                    }
                >
                    {searchResults.map(result => (
                        <li
                            key={result.id}
                            style={this.style.searchItem}
                            onMouseOver={e => {
                                e.currentTarget.style.backgroundColor = '#efefef';
                            }}
                            onMouseOut={e => {
                                e.currentTarget.style.backgroundColor = '';
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                this.props.onItemClick(result.id);
                                this.setState({
                                    searchInput: '',
                                    searchResults: [],
                                })
                            }}
                        >{result.name}</li>
                    ))}
                </ul>
            </Fragment>
        );
    };
}

export default Search;
