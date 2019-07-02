import {
    buildSchema,
} from 'graphql';
import foods from './foods.json';

export const schema = buildSchema(`
    type Query {
        foods: [Food]
        foodById(number: String): [Food]
        foodByName(name: String): [Food]
    },
    type Food {
        number: String
        name: String
        weight: String
        group: String
    }
`);

const foodById = (args) => [foods.find(data => data.number === args.number)];

const foodByName = (args) => foods.filter(data => data.name.includes(args.name));

export const root = {
    foodById,
    foodByName,
    foods: () => foods,
};
