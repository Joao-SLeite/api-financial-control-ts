import { Request, Response, Router } from 'express';
import { TransactionController } from './controllers/TransactionController';

const routes = Router();

routes.get('/Transactions', new TransactionController().getTransactions);
routes.post('/Transactions', new TransactionController().createTransaction);
routes.put('/Transactions/:id', new TransactionController().updateTransaction);
routes.delete(
    '/Transactions/:id',
    new TransactionController().deleteTransaction
);

export default routes;
