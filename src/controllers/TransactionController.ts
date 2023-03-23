import { Request, Response } from 'express';
import { TransactionService } from '../services/TransactionService';

export class TransactionController {
    async getTransactions(req: Request, res: Response) {
        const transactionService = new TransactionService();
        const transations = await transactionService.getTransactions();

        return res.status(200).json(transations);
    }
}
