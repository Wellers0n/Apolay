 
import { GraphQLObjectType } from 'graphql';

import DoneItemSubscription from '../modules/subscription/DoneItemSubscription';



const SubscriptionType = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    DoneItem: DoneItemSubscription as any,
  },
});

export default SubscriptionType;