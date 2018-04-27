import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'

import typeDefs from './app/schema'
import Talk from './app/model'
import resolvers from './app/resolvers'

require('dotenv').config()

mongoose.connect(
  `mongodb://${process.env.DB_USER}:${encodeURIComponent(
    process.env.DB_PASS
  )}@ds255329.mlab.com:55329/blogapp`,
  err => {
    if (err) console.log(err)
    console.log('Connection successful')
  }
)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const PORT = 3000
const app = express()

// Cors
app.use(cors())

const corsOptions = {
  origin(origin, callback) {
    callback(null, true)
  },
  credentials: true
}
app.use(cors(corsOptions))
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type,token')
  next()
}
app.use(allowCrossDomain)

// GraphQL
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({ schema, context: { Talk } })
)
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(PORT, () =>
  console.log('Blog App Server running on port: ' + PORT + '!')
)
