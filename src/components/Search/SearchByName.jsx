import React, { Component } from 'react';
import Search from '../common/Search.jsx';
import graphql from '../../helpers/graphql';

export class SearchByName extends Component {

    foodByName = async (input) => {
        const data = await graphql(`
            query FindFood {
                foods(name: "${input}") {
                    name
                    number
                }
            }
        `);
        return data.foods.map(food => ({
            id: food.number,
            name: food.name,
        }));
    }

    render() {
        return (
            <Search
                onSearch={this.foodByName}
                onItemClick={this.props.onItemClick}
                placeholder="Sök råvara..."
                style={{ marginBottom: 16 }}
            />
        );
    };
}
