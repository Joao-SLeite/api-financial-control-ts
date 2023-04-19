import { Request, Response } from 'express';
import { InstallmentService } from '../services/InstallmentService';
import { isThereErrorOnReqQueryInstallment } from '../helpers/validateErrorOnRequest';
import { BadRequestError } from '../helpers/apiErrors';

export class InstallmentController {
    async getInstallmentsByMonthAndYear(req: Request, res: Response) {
        if (isThereErrorOnReqQueryInstallment(req.query)) {
            throw new BadRequestError(
                'Os parâmetros de busca(month e year) fornecidos na url não são válidos'
            );
        }
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
