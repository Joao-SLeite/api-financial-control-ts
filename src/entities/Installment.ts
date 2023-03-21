import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Transaction } from './Transaction';

@Entity('installments')
export class Installment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'float' })
    amount: number;

    @Column()
    installmentNumber: number;

    @Column()
    dueDate: Date;

    @ManyToOne(() => Transaction, (transaction) => transaction.installments)
    @JoinColumn({ name: 'transaction_id' })
    transaction: Transaction;
}
