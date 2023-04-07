import { NextFunction, Request, Response } from 'express';

export const errors = (
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
