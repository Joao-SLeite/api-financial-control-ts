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
    async updateTransaction(req: Request, res: Response) {
        const iTransaction: ITransaction = req.body;
        const { id } = req.params;
        iTransaction.id = parseInt(id);
        const transactionService = new TransactionService();
        await transactionService.updateTransaction(iTransaction);
        return res.status(204).json();
    }
    async deleteTransaction(req: Request, res: Response) {
        const { id } = req.params;
        const transactionService = new TransactionService();
        await transactionService.deleteTransaction(Number(id));
        return res.status(204).json();
    }
}
