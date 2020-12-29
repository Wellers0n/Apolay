import "@babel/polyfill";
import { createServer } from "http";
import app from "./app";
import connectDatabase from "./database";
import { graphqlPort } from './config';

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
})();
