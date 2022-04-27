import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
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
    it('shoulb be able to authenticate an user', async () => {
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

    it('shoulb be able to authenticated an noneexistents user', () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: 'false@email.com',
                password: '12345',
            });
        }).rejects.toBeInstanceOf(AppError);
    });
    it('shoulb be able to authenticated with incorret password', () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: '9999',
                email: 'user@user.com',
                password: '1234',
                name: 'User Test Error',
            };
            await createUserUseCase.execute(user);
            await authenticateUserUseCase.execute({
                email: user.email,
                password: 'IncorretPassword',
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
