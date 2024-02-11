const { ApolloServer } = require('apollo-server')

const typeDefs = `
    type Query {
        totalPhotos: Int!
    }

    type Mutation {
        postPhoto(name: String! description: String): Boolean!
    }
`
var photos = []

const resolvers = {
    Query: {
        totalPhotos: () => photos.length
    },

    Mutation: {
        postPhoto(parent, args) {
            photos.push(args)
            return true
        }
    }
}

// 1. Create a new instance of ApolloServer
// 2. Send it an object with typeDefs (the schema) and resolvers

const server = new ApolloServer({
    typeDefs,
    resolvers
})

// 3. Call the listen method on the server to start the server
server
    .listen()
    .then(({ url }) => console.log(`GraphQL Service running on ${url}`))
