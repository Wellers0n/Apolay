import { subscriptionWithClientId } from 'graphql-relay-subscription';
import ItemsModel from "./../../models/items";
import ItemsType from '../query/ItemsType';
import pubSub, { EVENTS } from '../../pubSub';
import { GraphQLInt } from 'graphql';
// import * as PostLoader from '../PostLoader';
// import { GraphQLContext } from '../../../graphql/types';

// type PostNew = {
//   postId: string;
// };

const sleep = (t = 1000) => new Promise((res) => setTimeout(res, t));

const DoneItemSubscription = subscriptionWithClientId<any, any>({
    name: 'count',
    inputFields: {
        count: {
            type: GraphQLInt
        }
    },
    outputFields: {
        count: {
            type: GraphQLInt,
            resolve: ({ count }) => count || `You can even execute subscriptions via HTTP.... You should do it with the ws transport instead :)`
        }
    },
    subscribe: async function* (_, args) {
        for (let i = 1; i <= args.to; i++) {
            yield { count: `ping ${i}` };
            await sleep();
        }
    },
});

export default DoneItemSubscription;