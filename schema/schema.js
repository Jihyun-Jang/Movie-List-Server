const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;


// dummy data
const movies = [
    { name: 'The Thing', genre: 'Sci-Fi horror', id: '1', directorId: '2'},
    { name: 'Parasite', genre: 'Comedy thriller', id: '2', directorId: '1'},
    { name: 'The Lord of the Rings', genre: 'Fantasy', id: '3', directorId: '3'},
    { name: 'Snowpiercer', genre: 'Sci-Fi drama', id: '4', directorId: '1'},
    { name: 'The Hobbit', genre: 'Fantasy', id: '5', directorId: '3'},
    { name: 'Okja', genre: 'Action adventure', id: '6', directorId: '1'}
];


const directors = [
    { name: 'Bong Joon-ho', nationality: 'South Korean', birthYear: 1969, id: '1'},
    { name: 'John Carpenter', nationality: 'American', birthYear: 1948, id: '2'},
    { name: 'Peter Jackson', nationality: 'New Zealand', birthYear: 1961, id: '3'}
]


const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        director: {
            type: DirectorType,
            resolve(parent, args){
                console.log(parent);
                return _.find(directors, { id: parent.directorId })
            }
        }
    })
});


const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        nationality: { type: GraphQLString },
        birthYear: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                return _.filter(movies, { directorId: parent.id });
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                // code to get data from db/ other source
                return _.find(movies, { id: args.id });
            }
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                return _.find(directors, { id: args.id });
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});