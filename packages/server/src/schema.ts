import { GraphQLSchema } from 'graphql'
import QueryType from './types/QueryType'
import MutationType from './types/MutationType'
import SubscriptionType from './types/SubscriptionType'

const schema =  new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
    subscription: SubscriptionType,
})

export default schema