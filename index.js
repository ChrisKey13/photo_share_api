const { ApolloServer } = require('apollo-server')

const typeDefs = `

    enum PhotoCategory {
        SELFIE
        PORTRAIT
        ACTION
        LANDSCAPE
        GRAPHIC
    }    

    type Photo {
        id: ID!
        url: String!
        name: String!
        description: String
        category: PhotoCategory!
    }

    type Query {
        totalPhotos: Int!
        allPhotos: [Photo!]!
    }

    input PostPhotoInput {
        name: String!
        category: PhotoCategory=PORTRAIT
        description: String
    }

    type Mutation {
        postPhoto(input: PostPhotoInput!): Photo!
    }
`

var _id = 0

var photos = []

const resolvers = {
    Query: {
        totalPhotos: () => photos.length,
        allPhotos: () => photos
    },

    Mutation: {
        postPhoto(parent, args) {

            var newPhoto = {
                id: _id++,
                ...args.input
            }
            photos.push(newPhoto)

            return newPhoto
        }
    },

    Photo: {
        url: parent => `http://yoursite.com/img/${parent.id}.jpg`
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
