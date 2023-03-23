import { Request, Response, Router } from 'express';
import { TransactionController } from './controllers/TransactionController';

const routes = Router();

routes.get('/Transactions', new TransactionController().getTransactions);

export default routes;
