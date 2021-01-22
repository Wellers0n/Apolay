import koa, { Request, Response } from "koa";
import route from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import bodyparser from "koa-bodyparser";
import cors from "kcors";
// import dotenv from "dotenv-safe";
const graphqlHTTP = require("koa-graphql");
import schema from "./schema";
// import mongoose from 'mongoose';
import { getUser } from "./auth";
// import database from './database';
import multer from "koa-multer";
import koaPlayground from 'graphql-playground-middleware-koa';

// init router and koa
const app = new koa();
const router = new route();
//init doenv
// dotenv.config();

// middlewares
app.use(logger());
app.use(cors());
app.use(json());
app.use(bodyparser());
// app.use(router.routes());
// app.use(router.allowedMethods());

router.get('/', async ctx => {
  ctx.body = 'Welcome';
});

const graphqlSettingsPerReq = async (req: Request, ctx: Response) => {
  const { user } = await getUser(req.header.authorization);

  return {
    graphiql: true,
    schema,
    rootValue: {
      request: ctx.req
    },
    context: {
      user,
      req
      // dataloaders,
    }
  };
};

const graphqlServer = graphqlHTTP(graphqlSettingsPerReq);

const storage = multer.memoryStorage();
const limits = {
  // Increasing max upload size to 30 mb, since busboy default is only 1 mb
  fieldSize: 30 * 1024 * 1024
};

router.all("/graphql", multer({ storage, limits }).any(), graphqlServer);
router.all(
  '/graphiql',
  koaPlayground({
    endpoint: '/graphql',
    subscriptionEndpoint: '/subscriptions',
    // subscriptionsEndpoint: `ws://localhost:${port}/subscriptions`
  }),
);

app.use(router.routes()).use(router.allowedMethods());


export default app;