import { GraphQLObjectType } from 'graphql';

import CompanyMutations from '../modules/mutation';

export default new GraphQLObjectType({
  name: 'MutationType',
  fields: () => ({
    ...CompanyMutations,
  }),
});