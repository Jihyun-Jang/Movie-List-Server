const graphql = require('graphql');
const _=require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;


// dummy data
const movies = [
    { name: 'The Thing', genre: 'Science fiction horror', id: '1'},
    { name: 'Train to Busan', genre: 'Action horror', id: '2'},
    { name: 'The Lord of the Rings', genre: 'Fantasy', id: '3'}
];

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLString }},
            resolve(parent, args){
                // code to get data from db/ other source
                return _find(movies, { id: args.id });
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});