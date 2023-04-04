import { Request, Response } from 'express';
import { InstallmentService } from '../services/InstallmentService';

export class InstallmentController {
    async getInstallmentsByMonthAndYear(req: Request, res: Response) {
        const { month, year } = req.query;
        const monthQuery = parseInt(month as string);
        const yearQuery = parseInt(year as string);

        const installmentService = new InstallmentService();
        const installments =
            await installmentService.getInstallmentsByMonthAndYear(
                monthQuery,
                yearQuery
            );

        res.status(200).json(installments);
    }
}
