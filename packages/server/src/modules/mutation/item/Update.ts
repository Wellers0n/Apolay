import ItemsModel from "./../../../models/items";
import { GraphQLString, GraphQLNonNull, GraphQLList } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import ItemsType from "../../query/ItemsType";

export default mutationWithClientMutationId({
    name: "UpdateItemMutation",
    inputFields: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        }
    },
    mutateAndGetPayload: async (
        { id, name, description },
        context,
        options
    ) => {

        const item = await ItemsModel.findOne({ _id: id })

        if (item) {
            // updated item if exist
            await ItemsModel.updateOne(
                { _id: id },
                { name, description }
            );

            // get all items for updated store in frontend
            const items = await ItemsModel.find({});
            return {
                msg: "Item updated successfully",
                items: items
            };
        }
        return {
            msg: "Error when updating an item"
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