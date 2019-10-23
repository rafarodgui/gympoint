import { Router } from 'express';

import StudentsController from './app/controllers/StudentsController';

import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
// Admin login for be ablle to manipulate students data
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
// All students routes must have a authenticator middleware
routes.post('/students', StudentsController.store);
routes.put('/students/:id', StudentsController.update);

export default routes;
