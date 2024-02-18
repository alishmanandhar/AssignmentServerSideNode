const {gql} = require('apollo-server');

module.exports = gql`
    scalar Date
    
    type User {
        id: ID!
        name: String
        age: Int
        bio: String
        createdAt: Date
    }

    input UserInput {
        name: String
        age: Int
        bio: String
        createdAt: Date
    }

    type Query {
        user(ID: ID!): User!
        getUsers(number: Int, name: String, sort: String): [User]
    }

    type Mutation {
        createUser(userInput: UserInput): User!
        deleteUser(ID: ID!): Boolean
        editUser(ID: ID!, userInput: UserInput): Boolean
    }
`