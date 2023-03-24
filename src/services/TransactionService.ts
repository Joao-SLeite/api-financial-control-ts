import { Installment } from '../entities/Installment';
import { Transaction } from '../entities/Transaction';
import { ITransaction } from '../interfaces/ITransaction';
import { transactionRepository } from '../repositories/transactionRepository';

export class TransactionService {
    async getTransactions(): Promise<Transaction[]> {
        const transactions = await transactionRepository.find({
            relations: { installments: true },
        });

        return transactions;
    }
    async createTransaction(iTransaction: ITransaction): Promise<Transaction> {
        const creationAt = new Date();
        iTransaction.creationDate = creationAt;
        const {
            description,
            amount,
            creationDate,
            installmentsNumber,
            typeTransaction,
        } = iTransaction;

        const transaction = await transactionRepository.create({
            description,
            amount,
            creationDate,
            installmentsNumber,
            typeTransaction,
        });

        const installments: Installment[] = [];

        for (let i = 0; i < iTransaction.installmentsNumber; i++) {
            const dueDate = new Date();
            dueDate.setMonth(dueDate.getMonth() + i);

            const installment = new Installment();
            installment.amount =
                transaction.amount / transaction.installmentsNumber;
            installment.dueDate = dueDate;
            installment.installmentNumber = i + 1;
            installments.push(installment);
        }
        transaction.installments = installments;
        await transactionRepository.save(transaction);
        return transaction;
    }
}
