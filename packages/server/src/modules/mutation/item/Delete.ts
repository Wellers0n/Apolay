import ItemsModel from "./../../../models/items";
import { GraphQLString, GraphQLNonNull, GraphQLList } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import ItemsType from "../../query/ItemsType";

export default mutationWithClientMutationId({
    name: "DeleteItemMutation",
    inputFields: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    mutateAndGetPayload: async ({ id }, context, options) => {
        const items = await ItemsModel.deleteOne({ _id: id });

        const ItemsUpdated = await ItemsModel.find({});

        if (items) {
            return {
                msg: "Item deleted successfully",
                items: ItemsUpdated
            };
        }
        return {
            msg: "Error when deleting an item"
        };
    },
    outputFields: {
        msg: {
            type: GraphQLString,
            resolve: ({ msg }) => msg
        },

        items: {
            type: new GraphQLList(ItemsType),
            resolve: ({ items }) => items
        }
    }
});
