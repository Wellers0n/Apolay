import Users from "./../../../models/users";
import { GraphQLString, GraphQLNonNull } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";

export default mutationWithClientMutationId({
  name: "RegisterUserMutation",
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }   
  },
  mutateAndGetPayload: async ({ name, email, password }) => {
    const user = await Users.findOne({ email });

    if (!user) {
      await Users.create({ name, email, password });
      return {
        msg: "User created successfully"
      };
    }
    return {
        msg: "User exist"
    };
  },
  outputFields: {
    msg: {
      type: GraphQLString,
      resolve: ({ msg }) => msg
    }
  }
});