import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
} from 'graphql';

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            counter: {
                type: GraphQLInt,
                resolve: () => 42,
            },
            message: {
                type: GraphQLString,
                resolve: () => 'The message',
            }
        })
    })
})

export default schema;
