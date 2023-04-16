import { Request, Response } from 'express';
import { ITransaction } from '../interfaces/ITransaction';
import { TransactionService } from '../services/TransactionService';
import { BadRequestError } from '../helpers/apiErrors';
import { isThereErrorOnReqBodyTransaction } from '../helpers/validateErrorOnRequest';

export class TransactionController {
    async getTransactions(req: Request, res: Response) {
        const transactionService = new TransactionService();
        const transations = await transactionService.getTransactions();

        return res.status(200).json(transations);
    }

    async createTransaction(req: Request, res: Response) {
        if (isThereErrorOnReqBodyTransaction(req.body)) {
            throw new BadRequestError('Os dados da requisição não são válidos');
        }
        const iTransaction: ITransaction = req.body;

        const transactionService = new TransactionService();
        const transaction = await transactionService.createTransaction(
            iTransaction
        );
        return res.status(201).json({ transactionId: transaction.id });
    }
    async updateTransaction(req: Request, res: Response) {
        if (isThereErrorOnReqBodyTransaction(req.body)) {
            throw new BadRequestError('Os dados da requisição não são válidos');
        }
        const iTransaction: ITransaction = req.body;

        const { id } = req.params;
        if (!parseInt(id)) {
            throw new BadRequestError(
                'O id informado na url da requisição não é válido'
            );
        }
        iTransaction.id = parseInt(id);

        const transactionService = new TransactionService();
        await transactionService.updateTransaction(iTransaction);
        return res.status(204).json();
    }
    async deleteTransaction(req: Request, res: Response) {
        const { id } = req.params;
        if (!parseInt(id)) {
            throw new BadRequestError(
                'O id informado na url da requisição não é válido'
            );
        }
        const transactionService = new TransactionService();
        await transactionService.deleteTransaction(Number(id));
        return res.status(204).json();
    }
}
