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
            fontFamily: 'Product Sans Black Regular',
            fontSize: '2.5em',
            fontWeight: 'bold',
            textAlign: 'center',
        },
    }

    foodById = async (number) => {
        const { foodById } = await graphql(`
            query GetFoodById {
                foodById(number: "${number}") {
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
        console.log('Found item', foodById[0]);
        return foodById[0];
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

    render() {
        const {
            ingredients,
            selectedItem,
        } = this.state;
        return (
            <div style={this.style.wrapper}>
                <h3 style={this.style.title}>GraphQL calorie calculator</h3>
                <br />
                <SearchByName onItemClick={this.addItem} />
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
                    {ingredients.length > 0 &&
                        <Recipe data={ingredients} removeItem={this.removeItem} showItem={this.showItem} onChangeInput={(weight, item) => this.updateWeight(weight, item)} />
                    }
                    {selectedItem.name !== undefined &&
                        <SelectedItem data={selectedItem} />
                    }
                </div>
            </div>
        );
    }
};

ReactDOM.render(<App />, document.getElementById('wrapper'));
