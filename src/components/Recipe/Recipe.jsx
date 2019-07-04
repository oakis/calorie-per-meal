import React, { Component } from 'react';
import styles from '../../styles';
import IconButton from '../common/IconButton.jsx';

export class Recipe extends Component {

    style = {
        wrapper: {
            alignSelf: 'flex-start',
            flex: 1,
            marginRight: 4,
            padding: 15,
            ...styles.boxWithShadow,
        },
        name: {
            fontSize: '1.5em',
            marginBottom: 8,
        },
        listHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 8px',
        },
        listHeaderFirstItem: {
            marginLeft: 32,
        },
        ul: {
            marginTop: '0.3em',
            paddingInlineStart: 0,
            marginBlockEnd: 0,
        },
        li: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 8,
            marginBottom: '0.3em',
            ...styles.boxWithShadow,
        },
        liFirstItem: {
            display: 'flex',
            alignItems: 'center',
        },
    }

    render() {
        return (
            <div style={this.style.wrapper}>
                <div style={this.style.name}>Recept</div>
                <div style={this.style.listHeader}>
                    <em style={this.style.listHeaderFirstItem}>Ingrediens</em>
                    <em>Kcal</em>
                </div>
                <ul style={this.style.ul}>
                    {this.props.data.map((item, i) => (
                        <li style={this.style.li} key={i}>
                            <div style={this.style.liFirstItem}>
                                <IconButton
                                    onClick={() => this.props.removeItem(item)}
                                    icon="remove"
                                    size="small"
                                    color="tomato"
                                />
                                <span style={{ marginLeft: 8 }}>{item.name}</span>
                            </div>
                            <span>{item.kcal}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
