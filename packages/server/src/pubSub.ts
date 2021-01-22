import { PubSub } from 'graphql-subscriptions';

export const EVENTS = {
  ITEMS: {
    DONE: 'DONE',
  },
};

export default new PubSub();