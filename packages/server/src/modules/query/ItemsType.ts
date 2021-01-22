import { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLBoolean
} from 'graphql'
import {globalIdField} from 'graphql-relay'

export default new GraphQLObjectType({
    name: 'Items',
    fields: () => ({
        id: globalIdField('Items'),
        _id:{
            type: GraphQLID
        },
        id_user: {
            type: GraphQLID
        },
        name:{
            type: GraphQLString,
        },
        description:{
            type: GraphQLString,
        },
        done: {
            type: GraphQLBoolean,
        }        
    })
})