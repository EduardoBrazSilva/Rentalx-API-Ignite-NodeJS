import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
    email: string;
    password: string;
}
interface IRespose {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}
    async execute({ email, password }: IRequest): Promise<IRespose> {
        // verifica de o email está correto
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new Error('Email or password incorrect!');
        }
        // Verifica se senha está correta
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Email or password incorrect!');
        }
        // Gerar jsonwebtoken
        const token = sign({}, '513ad4f1d4bb1f294b3f588b3fda5515', {
            subject: user.id,
            expiresIn: '1d',
        });

        const tokenReturn: IRespose = {
            token,
            user: {
                name: user.name,
                email: user.email,
            },
        };
        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };
