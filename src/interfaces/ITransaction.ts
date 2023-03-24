import { TypeTransaction } from '../utils/TypeTransaction';

export interface ITransaction {
    id?: number;
    description: string;
    amount: number;
    creationDate?: Date;
    installmentsNumber: number;
    typeTransaction: TypeTransaction;
}
