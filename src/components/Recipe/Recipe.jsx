import React, { Component, Fragment } from 'react';
import graphql from '../../helpers/graphql';
import styles from '../../styles';
import IconButton from '../common/IconButton.jsx';
import MaterialIcon from 'material-icons-react';
import Button from '../common/Button.jsx';
import Toast from '../common/Toast.jsx';
import { SearchRecipe } from './SearchRecipe.jsx';

export class Recipe extends Component {

    state = {
        loadedRecipeName: '',
        recipeName: '',
        saveSuccess: false,
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
            wrapper: {
                display: 'flex',
                justifyContent: 'space-between',
                margin: '30px 0 0',
            },
            left: {
                display: 'flex',
                justifyContent: 'flex-start',
            },
            right: {
                display: 'flex',
                justifyContent: 'flex-end',
            },
            buttonText: {
                marginRight: 8,
            },
        },
    }

    calculateKcal = (item) => item.weight <= 0 ? 0 : (Number.parseInt(item.weight, 10) * Number.parseInt(item.kcal, 10) / 100);

    loadRecipe = async (id) => {
        return await graphql(`
            query LoadRecipe {
                recipes(id: "${id}") {
                    id
                    name
                    ingredients {
                        name
                        number
                        weight
                        kcal
                    }
                }
            }
        `);
    }

    onChangeWeight = (weight, item) => this.props.onChangeWeight(weight, item);

    onChangeRecipeName = (recipeName) => this.setState({ recipeName });

    saveRecipe = async () => {
        const name = this.state.recipeName;
        const ingredients = this.props.data.map(({ number, weight }) => ({
            number,
            weight,
        }));
        await graphql(`
            mutation Recipe($name: String!, $ingredients: [IngredientInput]) {
                recipe(name: $name, ingredients: $ingredients) {
                    name
                    ingredients {
                        number
                        weight
                    }
                }
            }
        `, {
            "name": name,
            "ingredients": ingredients
        })
        .then(() => this.setState({ saveSuccess: true }));
    }

    render() {
        return (
            <Fragment>
                <Toast
                    icon="check"
                    text={`Receptet "${this.state.recipeName}" sparades.`}
                    open={this.state.saveSuccess}
                    close={() => this.setState({ saveSuccess: false })}
                />
                <div style={{...this.style.wrapper, ...this.props.style}}>
                    <div style={{ ...this.style.name, marginBottom: 30 }}>Recept {this.state.loadedRecipeName.length > 0 && `(${this.state.loadedRecipeName})`}</div>
                    {this.props.data.length > 0 &&
                        <Fragment>
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
                                        {this.props.data.length > 0 ? this.props.data.map(item => item.weight <= 0 ? 0 : Number.parseInt(item.weight, 10)).reduce((a, b) => a + b) : 0} gram
                                    </span>
                                </div>
                                <div style={this.style.result.item}>
                                    <em>Total kcal:</em>
                                    <span style={this.style.result.number}>
                                        {this.props.data.length > 0 ? this.props.data.map(item => this.calculateKcal(item)).reduce((a, b) => a + b) : 0} kcal
                                    </span>
                                </div>
                            </div>
                        </Fragment>
                    }
                    <div style={this.style.toolbar.wrapper}>
                        <div style={this.style.toolbar.left}>
                            <SearchRecipe onItemClick={async (id) => {
                                const loadedRecipe = await this.loadRecipe(id);
                                this.props.setData(loadedRecipe);
                                this.setState({
                                    loadedRecipeName: loadedRecipe.recipes[0].name
                                });
                            }} />
                        </div>
                        <div style={this.style.toolbar.right}>
                            <input
                                value={this.state.recipeName}
                                onChange={(e) => this.onChangeRecipeName(e.target.value)}
                            />
                            <Button onClick={this.saveRecipe}>
                                <span style={this.style.toolbar.buttonText}>Spara</span>
                                <MaterialIcon size="small" icon="save" color="#eee" />
                            </Button>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
