import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../helpers/apiErrors';

export const handleServerError = (
    error: Error & Partial<ApiError>,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error) {
        const statusCode = error.statusCode ?? 500;
        const message = error.statusCode
            ? error.message
            : 'Erro ao tentar conectar ao servidor';
        return res.status(statusCode).send({ message });
    }
    next();
};
export const handleUrlNotFound = (req: Request, res: Response) => {
    return res.status(404).json({ message: 'Pagina não encontrada' });
};
