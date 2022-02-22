import userRouter from './userRouter.mjs';
import betRouter from './betRouter.mjs';
import ticketRouter from './ticketRouter.mjs';

const bindRoutes = (app) => {
  app.use('/user', userRouter);
  app.use('/bet', betRouter);
  app.use('/ticket', ticketRouter);
};

export default bindRoutes;
