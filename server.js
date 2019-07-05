import express from 'express';
import GraphQLHTTP from 'express-graphql';
import bodyParser from 'body-parser';
import { schema, root } from './data/schema';
import { saveFile } from './api/recipes.js';

let app = express();

app.use(express.static('public'));
app.use(bodyParser.json())

app.use('/graphql', GraphQLHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}));

app.post('/file', saveFile)

app.listen(3000);
