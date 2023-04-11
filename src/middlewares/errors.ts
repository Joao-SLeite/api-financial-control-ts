import { NextFunction, Request, Response } from 'express';

export const handleServerError = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error) {
        return res
            .status(500)
            .send({ message: 'Erro ao tentar conectar ao servidor' });
    }
    next();
};
export const handleUrlNotFound = (req: Request, res: Response) => {
    return res.status(404).json({ message: 'Pagina não encontrada' });
};
