import "@babel/polyfill";
import { createServer } from "http";
import app from "./app";
import connectDatabase from "./database";
import { graphqlPort } from './config';
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { getUser } from './auth';
import { getContext } from './getContext'
import { execute, subscribe } from 'graphql';
import schema from './schema'

(async () => {
  try {
    await connectDatabase();
  } catch (error) {
    console.log("Could not connect to database", { error });
    throw error;
  }

  const server = createServer(app.callback());

  server.listen(graphqlPort, () => {
    return console.log(
      `SERVER ON: http://localhost:${graphqlPort}/graphql`
    );
  });

  // server subscription
  type ConnectionParams = {
    authorization?: string;
  };
  SubscriptionServer.create(
    {
      onConnect: async (connectionParams: ConnectionParams) => {
        const { user } = await getUser(connectionParams.authorization);

        return await getContext({ user });
      },
      // eslint-disable-next-line
      onDisconnect: () => console.log('Client subscription disconnected!'),
      execute,
      subscribe,
      schema,
    },
    {
      server,
      path: '/subscriptions',
    },
  );

})();
