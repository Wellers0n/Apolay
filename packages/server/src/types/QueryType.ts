import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLInt
} from "graphql";
//   import ArticleType from "../modules/main/ArticleType";
import ItemsType from "./../modules/query/ItemsType";
import ItemsModel from "../models/items";
//   import commentModel from "../model/comment";
//   import Slugify from "./../modules/helper/Slugify";

export default new GraphQLObjectType({
    name: "Query",
    description: 'The root of all... queries',
    fields: () => ({
        item: {
            type: ItemsType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: (parentValue, args, ctx) => {
                return ItemsModel.findOne({ _id: args.id });
            }
        },
        items: {
            type: new GraphQLList(ItemsType),
            args: {
                skip: {
                    type: GraphQLInt
                },
                limit: {
                    type: GraphQLInt
                }
            },
            resolve: (parentValue, args, ctx) => {
                // const idUser = ctx.user.id;
                const limit = args.limit;
                const skip = Math.max(0, args.skip);
                return ItemsModel
                    .find({})
                    .limit(limit)
                    .skip(skip);
            }
        }
    })
});