import Users from "./../../../models/users";
import { GraphQLString, GraphQLNonNull } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { generateToken,UserType } from "../../../auth";

export default mutationWithClientMutationId({
  name: "LoginUserMutation",
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  mutateAndGetPayload: async ({ email, password }) => {
    const user = await Users.findOne({ email, password }) as UserType

    if (!user) {
      return {
        error: "Invalid login or password"
      };
    }

    return {
      token: generateToken(user)
    };
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    }
  }
});
