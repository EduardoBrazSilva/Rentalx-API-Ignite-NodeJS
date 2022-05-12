interface ICreateUserTokenDTO {
    user_id: string;
    expired_date: Date;
    refresh_token: string;
}

export { ICreateUserTokenDTO };
