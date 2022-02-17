import userRouter from './userRouter.mjs';
import betRouter from './betRouter.mjs';

const bindRoutes = (app) => {
  app.use('/user', userRouter);
  app.use('/bet', betRouter);
};

export default bindRoutes;
