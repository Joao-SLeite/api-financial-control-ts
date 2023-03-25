import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TypeTransaction } from '../utils/TypeTransaction';
import { Installment } from './Installment';

@Entity('transactions')
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'float' })
    amount: number;

    @Column()
    creationDate: Date;

    @Column()
    installmentsNumber: number;

    @Column({
        type: 'enum',
        enum: TypeTransaction,
        default: TypeTransaction.VARIABLEEXPENSES,
    })
    typeTransaction: TypeTransaction;

    @OneToMany(() => Installment, (installment) => installment.transaction, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    installments: Installment[];
}
