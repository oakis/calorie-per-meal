import React, { Component } from 'react';
import styles from '../../styles';
import IconButton from '../common/IconButton.jsx';
import MaterialIcon from 'material-icons-react';
import Button from '../common/Button.jsx';

export class Recipe extends Component {

    state = {
        recipeName: '',
    }

    style = {
        wrapper: {
            alignSelf: 'flex-start',
            flex: 1,
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
        result: {
            wrapper: {
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                marginTop: 30,
            },
            item: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                minWidth: 150,
                height: 75,
                borderBottom: '1px dotted #555'
            },
            number: {
                fontFamily: 'Product Sans Black Regular',
                fontSize: '2.5em',
                marginLeft: 15,
            },
        },
        toolbar: {
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '30px 0 0',
        },
        buttonText: {
            marginRight: 8,
        },
    }

    calculateKcal = (item) => item.weight <= 0 ? 0 : (Number.parseInt(item.weight, 10) * Number.parseInt(item.kcal, 10) / 100);

    onChangeWeight = (weight, item) => this.props.onChangeWeight(weight, item);

    onChangeRecipeName = (recipeName) => this.setState({ recipeName });

    saveRecipe = () => {
        fetch('http://localhost:3000/file', {
            method: 'post',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.recipeName,
                ingredients: this.props.data.map(({ number, weight }) => ({
                    number,
                    weight,
                })),
            }),
        })
            .then(json => json.json())
            .then(console.log)
            .catch(console.log);
    }

    render() {
        return (
            <div style={{...this.style.wrapper, ...this.props.style}}>
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
                                    onChange={(e) => this.onChangeWeight(e.target.value, item)}
                                    onClick={e => e.stopPropagation()}
                                    type="number"
                                />
                            </td>
                            <td style={this.style.td}>{this.calculateKcal(item)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div style={this.style.result.wrapper}>
                    <div style={this.style.name}>Sammanställning</div>
                    <div style={this.style.result.item}>
                        <em>Antal ingredienser:</em>
                        <span style={this.style.result.number}>
                            {this.props.data.length}
                        </span>
                    </div>
                    <div style={this.style.result.item}>
                        <em>Total vikt:</em>
                        <span style={this.style.result.number}>
                            {this.props.data.map(item => item.weight <= 0 ? 0 : Number.parseInt(item.weight, 10)).reduce((a, b) => a + b)} gram
                        </span>
                    </div>
                    <div style={this.style.result.item}>
                        <em>Total kcal:</em>
                        <span style={this.style.result.number}>
                            {this.props.data.map(item => this.calculateKcal(item)).reduce((a, b) => a + b)} kcal
                        </span>
                    </div>
                </div>
                <div style={this.style.toolbar}>
                        <input
                            value={this.state.recipeName}
                            onChange={(e) => this.onChangeRecipeName(e.target.value)}
                        />
                        <Button onClick={this.saveRecipe}>
                            <span style={this.style.buttonText}>Spara</span>
                            <MaterialIcon size="small" icon="save" color="#eee" />
                        </Button>
                </div>
            </div>
        );
    }
}
