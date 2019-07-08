import React from 'react';
import ReactDOM from 'react-dom';
import graphql from './helpers/graphql';
import { SelectedItem, SearchByName, Recipe } from './components';

class App extends React.Component {

    state = {
        ingredients: [],
        selectedItem: {},
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
            fontFamily: 'Product Sans Thin Regular',
            fontSize: '4em',
            fontWeight: '100',
            textAlign: 'center',
            color: 'steelblue',
            margin: '0.5em 0',
        },
    }

    foodById = async (number) => {
        const { foods } = await graphql(`
            query GetFoodById {
                foods(number: "${number}") {
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
        console.log('Found item', foods[0]);
        return foods[0];
    }

    addItem = async (number) => {
        const item = await this.foodById(number);
        this.setState(state => ({
            ingredients: [...state.ingredients, {
                name: item.name,
                kcal: item.nutrition.find(nutrition => nutrition.name === 'Energi (kcal)').value,
                number: item.number,
                weight: item.weight,
            }]
        }));
    }

    removeItem = (item) => {
        this.setState(state => ({
            ingredients: state.ingredients.filter(recipe => recipe.number !== item.number),
        }));
    }

    showItem = async (number) => {
        this.setState({
            selectedItem: await this.foodById(number),
        });
    }

    updateWeight = (weight, item) => {
        this.setState((state) => {
            const findIndex = state.ingredients.findIndex((obj => obj.number === item.number));
            return {
                ...state,
                ingredients: [
                    ...state.ingredients.map((ingredient, index) => {
                        if (index === findIndex) {
                            return {
                                ...item,
                                weight,
                            }
                        }
                        return ingredient;
                    }),
                ]
            }
        })
    }

    clearSelectedItem = () => {
        this.setState({ selectedItem: {} });
    }

    render() {
        const {
            ingredients,
            selectedItem,
        } = this.state;
        return (
            <div style={this.style.wrapper}>
                <h1 style={this.style.title}>CALORIE CALCULATOR</h1>
                <SearchByName onItemClick={this.addItem} />
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
                    {ingredients.length > 0 &&
                        <Recipe
                            data={ingredients}
                            removeItem={this.removeItem}
                            showItem={this.showItem}
                            onChangeWeight={(weight, item) => this.updateWeight(weight, item)}
                            style={selectedItem.name ? { marginRight: 8 } : null}
                        />
                    }
                    {selectedItem.name !== undefined &&
                        <SelectedItem
                            data={selectedItem}
                            style={selectedItem.name ? { marginLeft: 8 } : null}
                            clearSelectedItem={this.clearSelectedItem}
                        />
                    }
                </div>
            </div>
        );
    }
};

ReactDOM.render(<App />, document.getElementById('wrapper'));
