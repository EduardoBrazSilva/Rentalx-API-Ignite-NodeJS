import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { UsersTokenRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokenRepository';
import { AppError } from '@shared/errors/AppError';

interface IPayLoad {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    respose: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;
    const userTokensRepository = new UsersTokenRepository();

    if (!authHeader) {
        throw new AppError('Token missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const { sub: user_id } = verify(
            token,
            auth.secret_refresh_token
        ) as IPayLoad;

        const user = await userTokensRepository.findByUserIdAndRefreshToken(
            user_id,
            token
        );

        if (!user) {
            throw new AppError('User does not exists!', 401);
        }

        request.user = {
            id: user_id,
        };

        next();
    } catch {
        throw new AppError('Invalid token!', 401);
    }
}
