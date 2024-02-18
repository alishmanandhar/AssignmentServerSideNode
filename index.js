const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const MONGODB =  'mongodb+srv://admin:admin@cluster0.isavuhb.mongodb.net/?retryWrites=true&w=majority';
const API_PORT = 8000;

//Apollo Server for running GraphQL
//typeDefs: GraphQL Type Definitions
// resolvers: How do we resolve Queries / mutations

const server = new ApolloServer({
    typeDefs,
    resolvers
})

// connecting to mongodb database
mongoose.connect(MONGODB, {useNewUrlParser:true})
    .then(()=>{
        console.log("mongodb connected");
        // start server if connected to server.
        return server.listen({port:API_PORT})
    })
    .then((res)=>{
        console.log(`sever running at ${res.url}`)
    });