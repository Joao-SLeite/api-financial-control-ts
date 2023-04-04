import { Installment } from '../entities/Installment';
import { installmentRepository } from '../repositories/installmentRepository';

export class InstallmentService {
    async getInstallmentsByMonthAndYear(
        month: number,
        year: number
    ): Promise<Installment[]> {
        const installments = await installmentRepository
            .createQueryBuilder('installment')
            .leftJoinAndSelect('installment.transaction', 'transaction')
            .where('MONTH(installment.dueDate) = :month', { month })
            .andWhere('YEAR(installment.dueDate) = :year', { year })
            .getMany();

        return installments;
    }
}
