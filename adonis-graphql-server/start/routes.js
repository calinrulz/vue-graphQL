'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

const ApolloServer = use('ApolloServer')
const schema = require('../app/data/schema')

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' }
})

Route.route('/graphql', ({ request, auth, response }) => {
  return ApolloServer.graphql({
    schema,
    context: { auth }
  }, request, response)
}, ['GET', 'POST'])

Route.get('/graphiql', ({ request, response }) => {
  return ApolloServer.graphiql({ endpointURL: '/graphql' }, request, response)
})
