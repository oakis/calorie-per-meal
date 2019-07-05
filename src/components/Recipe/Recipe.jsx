import React, { Component } from 'react';
import styles from '../../styles';
import IconButton from '../common/IconButton.jsx';

export class Recipe extends Component {

    style = {
        wrapper: {
            alignSelf: 'flex-start',
            flex: 1,
            marginRight: 4,
            padding: 30,
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
        table: {
            width: '100%',
            borderSpacing: 15,
        },
        tr: {
            cursor: 'pointer',
            borderRadius: 5,
            boxShadow: '2px 2px 4px 1px #ccc',
        },
        td: {
            padding: '10px 0',
        },
        thead: {
            textAlign: 'left',
        },
        footer: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            marginTop: 30,
        },
        result: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minWidth: 150,
            height: 75,
            borderBottom: '1px dotted #555'
        },
        resultNumber: {
            fontFamily: 'Product Sans Black Regular',
            fontSize: '2.5em',
            marginLeft: 15,
        }
    }

    calculateKcal = (item) => item.weight <= 0 ? 0 : (Number.parseInt(item.weight, 10) * Number.parseInt(item.kcal, 10) / 100);

    onChangeInput = (weight, item) => this.props.onChangeInput(weight, item);

    render() {
        return (
            <div style={this.style.wrapper}>
                <div style={{ ...this.style.name, marginBottom: 30 }}>Recept</div>
                <table style={this.style.table}>
                    <thead>
                        <tr style={this.style.thead}>
                            <th></th>
                            <th>Ingrediens</th>
                            <th>Vikt i gram</th>
                            <th>Kcal</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.data.map((item, i) => (
                        <tr style={this.style.tr} key={i} onClick={() => this.props.showItem(item.number)}>
                            <td style={this.style.td}>
                                <IconButton
                                    onClick={() => this.props.removeItem(item)}
                                    icon="delete"
                                    size="small"
                                    color="tomato"
                                />
                            </td>
                            <td style={this.style.td}>{item.name}</td>
                            <td style={this.style.td}>
                                <input
                                    value={item.weight}
                                    onChange={(e) => this.onChangeInput(e.target.value, item)}
                                    onClick={e => e.stopPropagation()}
                                    type="number"
                                />
                            </td>
                            <td style={this.style.td}>{this.calculateKcal(item)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div style={this.style.footer}>
                    <div style={this.style.name}>Sammanställning</div>
                    <div style={this.style.result}>
                        <em>Antal ingredienser:</em>
                        <span style={this.style.resultNumber}>
                            {this.props.data.length}
                        </span>
                    </div>
                    <div style={this.style.result}>
                        <em>Total vikt:</em>
                        <span style={this.style.resultNumber}>
                            {this.props.data.map(item => item.weight <= 0 ? 0 : Number.parseInt(item.weight, 10)).reduce((a, b) => a + b)} gram
                        </span>
                    </div>
                    <div style={this.style.result}>
                        <em>Total kcal:</em>
                        <span style={this.style.resultNumber}>
                            {this.props.data.map(item => this.calculateKcal(item)).reduce((a, b) => a + b)} kcal
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
