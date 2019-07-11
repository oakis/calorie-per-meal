import fs from 'fs';
import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType,
} from 'graphql';
import { saveRecipe, loadRecipes } from '../api/recipes.js';
import foods from './foods.json';

const FoodType = new GraphQLObjectType({
    name: 'Food',
    fields: () => ({
        number: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        weight: {
            type: GraphQLString
        },
        group: {
            type: GraphQLString
        },
        nutrition: {
            type: new GraphQLList(NutritionType)
        },
    })
})

const NutritionType = new GraphQLObjectType({
    name: 'Nutrition',
    fields: () => ({
        name: {
            type: GraphQLString
        },
        value: {
            type: GraphQLString
        },
        unit: {
            type: GraphQLString
        },
    })
})

const RecipeType = new GraphQLObjectType({
    name: 'Recipe',
    fields: () => ({
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        ingredients: {
            type: new GraphQLList(IngredientsType)
        },
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
    })
});

const IngredientsInput = new GraphQLInputObjectType({
    name: 'IngredientInput',
    fields: () => ({
        number: {
            type: GraphQLString,
        },
        weight: {
            type: GraphQLString,
        },
    }),
    args: {
        number: {
            type: GraphQLString,
        },
        weight: {
            type: GraphQLString,
        },
    }
});

const IngredientsType = new GraphQLObjectType({
    name: 'Ingredient',
    fields: () => ({
        name: {
            type: GraphQLString,
        },
        number: {
            type: GraphQLString,
        },
        weight: {
            type: GraphQLString,
        },
        nutrition: {
            type: new GraphQLList(NutritionType)
        },
        kcal: {
            type: GraphQLString,
        },
    })
});

export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            foods: {
                type: new GraphQLList(FoodType),
                args: {
                    number: {
                        name: 'number',
                        type: GraphQLString
                    },
                    name: {
                        name: 'name',
                        type: GraphQLString
                    }
                },
                resolve: (root, args) => {
                    if (args.number) {
                        return [foodById(args.number)];
                    } else if (args.name) {
                        return foodByName(args.name);
                    }
                    return foods;
                },
            },
            recipes: {
                type: new GraphQLList(RecipeType),
                args: {
                    id: {
                        name: 'id',
                        type: GraphQLString
                    },
                    name: {
                        name: 'name',
                        type: GraphQLString
                    }
                },
                resolve: (root, args) => {
                    if (args.id) {
                        return loadRecipe(args.id);
                    } else if (args.name) {
                        return findRecipes(args.name);
                    }
                    return loadRecipes();
                },
            }
        })
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: () => ({
            recipe: {
                type: RecipeType,
                args: {
                    name: {
                        type: new GraphQLNonNull(GraphQLString),
                    },
                    ingredients: {
                        type: new GraphQLList(IngredientsInput)
                    },
                },
                resolve: async (root, args) => await saveRecipe(args),
            }
        }),
    }),
});

const foodById = (number) => foods.find(data => data.number === number);

const foodByName = (name) => foods.filter(data => new RegExp(name, 'i').test(data.name) === true);

const loadRecipe = (id) => {
    const data = loadRecipes().filter(data => data.id.includes(id));
    return data.map(recipe => ({
        ...recipe,
        ingredients: [
            ...recipe.ingredients.map(ingredient => {
                const food = foodById(ingredient.number);
                return {
                    ...food,
                    weight: ingredient.weight,
                    kcal: food.nutrition.find(nutrition => nutrition.name === 'Energi (kcal)').value,
                }
            })
        ]
    }));
};

const findRecipes = (name) => loadRecipes().filter(data => new RegExp(name, 'i').test(data.name) === true);

export const root = {
    foods: () => foods,
    recipes: loadRecipes(),
};
