import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayLoad {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    respose: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error('Token missing');
    }

    const [, token] = authHeader.split(' ');

    try {
        const { sub: user_id } = verify(
            token,
            '513ad4f1d4bb1f294b3f588b3fda5515'
        ) as IPayLoad;

        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new Error('User does not exists!');
        }

        next();
    } catch {
        throw new Error('Invalid token!');
    }
}
