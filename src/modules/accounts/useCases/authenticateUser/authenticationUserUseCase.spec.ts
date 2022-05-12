import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../CreateUser/createUserUseCase';
import { AuthenticateUserUseCase } from './authenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authentication User', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });
    it('should be able to authenticate an user', async () => {
        const user: ICreateUserDTO = {
            driver_license: '0123',
            email: 'user@test.com',
            password: '1234',
            name: 'User Test',
        };
        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty('token');
    });

    it('should be able to authenticated an nonexistent user', async () => {
        await expect(
            authenticateUserUseCase.execute({
                email: 'false@email.com',
                password: '12345',
            })
        ).rejects.toEqual(new AppError('Email or password incorrect!'));
    });
    it('should be able to authenticated with incorrect password', async () => {
        const user: ICreateUserDTO = {
            driver_license: '9999',
            email: 'user@user.com',
            password: '1234',
            name: 'User Test Error',
        };
        await createUserUseCase.execute(user);
        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: 'Incorrect Password',
            })
        ).rejects.toEqual(new AppError('Email or password incorrect!'));
    });
});
