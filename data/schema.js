import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType,
} from 'graphql';
import { saveFile } from '../api/recipes.js';
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
        number: {
            type: GraphQLString,
        },
        weight: {
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
                        return foodById(args);
                    } else if (args.name) {
                        return foodByName(args);
                    }
                    return foods;
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
                    }
                },
                resolve: async (root, args) => await saveFile(args),
            }
        }),
    }),
});

const foodById = (args) => [foods.find(data => data.number === args.number)];

const foodByName = (args) => foods.filter(data => data.name.includes(args.name));

export const root = {
    foods: () => foods,
};
