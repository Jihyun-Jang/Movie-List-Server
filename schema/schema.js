const graphql = require('graphql');
const _ = require('lodash');
const Movie = require('../models/movies')
const Director = require('../models/directors')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;


// dummy data
// const movies = [
//     { name: 'The Thing', genre: 'Sci-Fi horror', id: '1', year: 1982, directorId: '2'}    
// ];

// const directors = [
//     { name: 'Bong Joon-ho', nationality: 'South Korean', birthYear: 1969, id: '1'}
// ];


const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        year: { type: GraphQLInt },
        directorId: { type: GraphQLID },
        director: {
            type: DirectorType,
            resolve(parent, args){                
                // return _.find(directors, { id: parent.directorId })
                return Director.findById(parent.directorId);
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
                // return _.filter(movies, { directorId: parent.id });
                return Movie.find({ directorId: parent.id})
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
                // return _.find(movies, { id: args.id });
                return Movie.findById(args.id)
            }
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                // return _.find(directors, { id: args.id });
                return Director.findById(args.id)
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                // return movies;
                return Movie.find({})
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args){
                // return directors;
                return Director.find({});
            }
        }
    }
});


const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addDirector: {
            type: DirectorType,
            args: {
                name: { type: GraphQLString },
                nationality: { type: GraphQLString },
                birthYear: { type: GraphQLInt }
            },
            resolve(parent, args){
                let director = new Director({
                    name: args.name,
                    nationality: args.nationality,
                    birthYear: args.birthYear
                });
                return director.save();
            }
        },
        addMovie: {
            type: MovieType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                year: { type: GraphQLInt },
                directorId: { type: GraphQLID }
            },
            resolve(parent, args){
                let movie = new Movie({
                    name: args.name,
                    genre: args.genre,
                    year: args.year,
                    directorId: args.directorId
                });
                return movie.save();
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});