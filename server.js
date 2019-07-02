import express from 'express';
import GraphQLHTTP from 'express-graphql';
import { schema, root } from './data/schema';

let app = express();

app.use(express.static('public'));

app.use('/graphql', GraphQLHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(3000);
