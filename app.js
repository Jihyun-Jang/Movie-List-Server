const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();

dotenv.config();

const url = process.env.MONGOLAB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.log("Error: ", err.message));

app.use('/graphql', graphqlHTTP({
    schema, // schema: schema
    graphiql: true
}));

app.listen(3000, () => {
    console.log('Now listening for requests on port 3000');
});