import { Request, Response } from 'express';
import { ITransaction } from '../interfaces/ITransaction';
import { TransactionService } from '../services/TransactionService';

export class TransactionController {
    async getTransactions(req: Request, res: Response) {
        const transactionService = new TransactionService();
        const transations = await transactionService.getTransactions();

        return res.status(200).json(transations);
    }

    async createTransaction(req: Request, res: Response) {
        const iTransaction: ITransaction = req.body;
        const transactionService = new TransactionService();
        const transaction = await transactionService.createTransaction(
            iTransaction
        );
        return res.status(201).json({ transactionId: transaction.id });
    }
}
