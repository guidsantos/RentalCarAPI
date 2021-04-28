import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokensRepository {
    create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens>
    findByUserIdAndRefreshToken(refresh_token: string, user_id: string): Promise<UserTokens>
    deleteById(id: string): Promise<void>
}

export { IUsersTokensRepository }