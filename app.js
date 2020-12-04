const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const app = express();

app.use('/graphql', graphqlHTTP({

}));

app.listen(3000, () => {
    console.log('Now listening for requests on port 3000');
});