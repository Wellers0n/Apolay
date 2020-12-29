import Items from "./../../../models/items";
import { GraphQLString, GraphQLNonNull } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";

export default mutationWithClientMutationId({
    name: "CreateItemMutation",
    inputFields: {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        description: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    mutateAndGetPayload: async ({ name, description }, context) => {
        const userId = context.user.id
        const item = await Items.findOne({ name });
        if (!item) {
            await Items.create({ name, description, user_id: userId });
            return {
                msg: "Item created successfully"
            };
        }
        return {
            msg: "Item exist"
        };
    },
    outputFields: {
        msg: {
            type: GraphQLString,
            resolve: ({ msg }) => msg
        }
    }
});