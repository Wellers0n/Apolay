import { Request } from 'koa';

// import { IUser } from './modules/query/';
// import { getDataloaders } from './modules/loader/loaderRegister';
// import { GraphQLContext } from './graphql/types';

// type ContextVars = {
//   user?: IUser | null;
//   req?: Request;
// };

export const getContext = async (ctx: any) => {
//   const dataloaders = getDataloaders();

  return {
    req: ctx.req,
    // dataloaders,
    user: ctx.user,
  };
};