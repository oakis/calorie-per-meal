import React, { Component } from 'react';
import styles from '../../styles';

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
        ul: {
            marginTop: '0.3em',
            paddingInlineStart: 0,
            marginBlockEnd: 0,
        },
        li: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: 8,
            marginBottom: '0.3em',
            ...styles.boxWithShadow,
        },
    }

    render() {
        return (
            <div style={this.style.wrapper}>
                <div style={this.style.name}>Recept</div>
                <div style={this.style.listHeader}>
                    <em>Ingrediens</em>
                    <em>Kcal</em>
                </div>
                <ul style={this.style.ul}>
                    {this.props.data.map(item => (
                        <li style={this.style.li}>
                            <span>{item.name}</span>
                            <span>{item.kcal}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
