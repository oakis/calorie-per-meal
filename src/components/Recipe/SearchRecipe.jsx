import React, { Component } from 'react';
import Search from '../common/Search.jsx';
import graphql from '../../helpers/graphql';

export class SearchRecipe extends Component {

    recipeByName = async (input) => {
        const data = await graphql(`
            query LoadRecipes {
                recipes(name: "${input}") {
                    name
                    id
                }
            }
        `);
        return data.recipes;
    }

    render() {
        return (
            <Search
                onSearch={this.recipeByName}
                onItemClick={this.props.onItemClick}
                placeholder="Sök recept..."
            />
        );
    };
}
