import userRouter from './userRouter.mjs';
import betRouter from './betRouter.mjs';
import ticketRouter from './ticketRouter.mjs';
import visionRouter from './visionRouter.mjs';

const bindRoutes = (app) => {
  app.use('/user', userRouter);
  app.use('/bet', betRouter);
  app.use('/ticket', ticketRouter);
  app.use('/vision', visionRouter);
};

export default bindRoutes;
