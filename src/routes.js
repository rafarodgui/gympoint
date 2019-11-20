import { Router } from 'express';

import StudentsController from './app/controllers/StudentsController';
import PlansController from './app/controllers/PlansController';

import SessionController from './app/controllers/SessionController';

import RegistrationController from './app/controllers/RegistrationController';
import CheckinsController from './app/controllers/CheckinsController';

import HelpOrdersControllerStudent from './app/controllers/HelpOrdersControllerStudent';
import HelpOrdersControllerAdmin from './app/controllers/HelpOrdersControllerAdmin';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
// Admin login for be ablle to manipulate students data
routes.post('/sessions', SessionController.store);

routes.post('/students/:id/checkins', CheckinsController.store);
routes.get('/students/:id/checkins', CheckinsController.index);

routes.post('/students/help_orders', HelpOrdersControllerStudent.store);
routes.get('/students/:id/help_orders', HelpOrdersControllerStudent.index);

routes.use(authMiddleware);
// All students routes must have a authenticator middleware
routes.post('/students', StudentsController.store);
routes.put('/students/:id', StudentsController.update);
routes.get('/students', StudentsController.index);

routes.post('/plans', PlansController.store);
routes.get('/plans/', PlansController.index);
routes.put('/plans/:id', PlansController.update);
routes.delete('/plans/:id', PlansController.delete);

routes.post('/registration', RegistrationController.store);
routes.get('/registration/:id', RegistrationController.index);
routes.put('/registration/:id', RegistrationController.update);
routes.delete('/registration/:id', RegistrationController.delete);

routes.get(
  '/students/help_orders_with_no_answer',
  HelpOrdersControllerAdmin.index
);
routes.put(
  '/students/help_orders/:id/answer',
  HelpOrdersControllerAdmin.update
);

export default routes;
