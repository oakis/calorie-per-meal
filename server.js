import express from 'express';
import GraphQLHTTP from 'express-graphql';
import bodyParser from 'body-parser';
import { schema, root } from './data/schema';

let app = express();

app.use(express.static('public'));
app.use(bodyParser.json())

app.use('/graphql', GraphQLHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(3000);
