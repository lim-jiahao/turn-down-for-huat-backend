import userRouter from './userRouter.mjs';

const bindRoutes = (app) => {
  app.use('/user', userRouter);
};

export default bindRoutes;
