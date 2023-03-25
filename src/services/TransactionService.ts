import { Installment } from '../entities/Installment';
import { Transaction } from '../entities/Transaction';
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
            transactionUpdate.amount = amount;
            transactionUpdate.description = description;
            transactionUpdate.typeTransaction = typeTransaction;

            if (
                installmentsNumber !== transactionUpdate.installmentsNumber ||
                amount !== transactionUpdate.amount
            ) {
                const installments: Installment[] = [];
                transactionUpdate.installmentsNumber = installmentsNumber;
                transactionUpdate.installments = [];
                for (let i = 0; i < iTransaction.installmentsNumber; i++) {
                    const dueDate = transactionUpdate.creationDate;
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
        }

        return null;
    }
    async deleteTransaction(id: number): Promise<void> {
        const transaction = await transactionRepository.findOneOrFail({
            where: { id: id },
            relations: { installments: true },
        });

        const installments = transaction.installments;
        transaction.installments = [];
        await transactionRepository.save(transaction);

        await Promise.all(
            installments.map((installment) => {
                installmentRepository.delete(installment.id);
            })
        );

        await transactionRepository.delete(transaction.id);
    }
}
