import { transactionRepository } from '../repositories/transactionRepository';

export class TransactionService {
    async getTransactions() {
        const transactions = await transactionRepository.find({
            relations: { installments: true },
        });

        return transactions;
    }
}
