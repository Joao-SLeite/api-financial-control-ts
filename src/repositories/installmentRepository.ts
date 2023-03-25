import { AppDataSource } from '../data-source';
import { Installment } from '../entities/Installment';

export const installmentRepository = AppDataSource.getRepository(Installment);
