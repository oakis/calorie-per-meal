import React, { Component, Fragment } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import MaterialIcon from 'material-icons-react';
import Button from '../common/Button.jsx';
import styles from '../../styles';
import './Search.css';

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

    inputRef = React.createRef();

    componentDidMount() {
        document.addEventListener('click', this.onClick);
        document.addEventListener('keydown', this.onKeydown);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.onClick);
        document.removeEventListener('keydown', this.onKeydown);
    }

    inputRefReady = () => (this.inputRef && this.inputRef.current !== null) === true;

    onClick = (event) => {
        if (event.target.nodeName !== 'INPUT' && this.state.searchResults.length > 0) {
            this.setState({
                searchResults: []
            });
        }
    }

    onKeydown = (event) => {
        if (event.key === 'Escape' && this.state.searchResults.length > 0) {
            this.setState({
                searchResults: []
            });
        }
    }

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
                    style={{...this.props.style, ...this.style.form}}
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
                <TransitionGroup>
                    {searchResults.length > 0 &&
                        <CSSTransition className='animate-search' timeout={150}>
                            <ul
                                style={
                                    {
                                        ...this.style.searchResults,
                                        top: inputRefReady && shouldPlaceUnderInput ? (this.inputRef.current.offsetTop + this.inputRef.current.scrollHeight) - 2 : null,
                                        bottom: inputRefReady && !shouldPlaceUnderInput ? (window.innerHeight - this.inputRef.current.offsetTop) - 2 : null,
                                        left: inputRefReady ? this.inputRef.current.offsetLeft : 0,
                                        width: inputRefReady ? this.inputRef.current.scrollWidth : 0,
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
                        </CSSTransition>
                    }
                </TransitionGroup>
            </Fragment>
        );
    };
}

export default Search;
