import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserTokens } from '../infra/typeorm/entities/UserTokens';

interface IUsersTokensRepository {
    create({
        user_id,
        expired_date,
        refresh_token,
    }: ICreateUserTokenDTO): Promise<UserTokens>;
}

export { IUsersTokensRepository };
