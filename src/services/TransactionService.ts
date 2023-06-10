import { Installment } from '../entities/Installment';
import { Transaction } from '../entities/Transaction';
import { NotFoundError } from '../helpers/apiErrors';
import { ITransaction } from '../interfaces/ITransaction';
import { installmentRepository } from '../repositories/installmentRepository';
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
    async updateTransaction(
        iTransaction: ITransaction
    ): Promise<Transaction | null> {
        const { id, description, amount, installmentsNumber, typeTransaction } =
            iTransaction;

        const transactionUpdate = await transactionRepository.findOne({
            where: { id: id },
            relations: { installments: true },
        });
        if (transactionUpdate) {
            transactionUpdate.description = description;
            transactionUpdate.typeTransaction = typeTransaction;

            if (
                installmentsNumber !== transactionUpdate.installmentsNumber ||
                amount !== transactionUpdate.amount
            ) {
                transactionUpdate.amount = amount;
                const installments: Installment[] = [];
                transactionUpdate.installmentsNumber = installmentsNumber;
                const installmentsToDelete = transactionUpdate.installments;

                transactionUpdate.installments = [];
                await Promise.all(
                    installmentsToDelete.map((installment) => {
                        installmentRepository.delete(installment.id);
                    })
                );
                const creationDate = transactionUpdate.creationDate;
                for (let i = 0; i < iTransaction.installmentsNumber; i++) {
                    const dueDate = new Date(creationDate);
                    dueDate.setMonth(dueDate.getMonth() + i);

                    const installment = new Installment();
                    installment.amount =
                        transactionUpdate.amount /
                        transactionUpdate.installmentsNumber;
                    installment.dueDate = dueDate;

                    installment.installmentNumber = i + 1;
                    installments.push(installment);
                }
                transactionUpdate.installments = installments;
                await transactionRepository.save(transactionUpdate);
                return transactionUpdate;
            } else {
                await transactionRepository.save(transactionUpdate);
                return transactionUpdate;
            }
        } else {
            throw new NotFoundError(
                `A transação com o id: ${id} não foi encontrada`
            );
        }
    }
    async deleteTransaction(id: number): Promise<void> {
        const transaction = await transactionRepository.findOne({
            where: { id: id },
            relations: { installments: true },
        });

        if (!transaction) {
            throw new NotFoundError(
                `A transação com o id: ${id} não foi encontrada`
            );
        }

        const installments = transaction.installments;
        transaction.installments = [];

        await Promise.all(
            installments.map((installment) => {
                installmentRepository.delete(installment.id);
            })
        );
        await transactionRepository.save(transaction);
        await transactionRepository.delete(transaction.id);
    }
}
