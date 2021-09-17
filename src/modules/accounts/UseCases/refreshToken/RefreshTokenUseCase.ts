import { inject, injectable } from 'tsyringe';
import {verify, sign} from 'jsonwebtoken';

import {IUsersTokensRepository} from '@modules/accounts/repositories/IUsersTokensRepository'
import auth from '@config/auth';
import { AppError } from '@shared/errors/AppErrors';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
 
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjSDateProvider")
    private dayJsDateProvider: IDateProvider,
  ){}

  async execute(token: string):Promise<ITokenResponse> {
    const{email, sub} = verify(token, auth.secret_refresh_token) as IPayload;

    const user_id = sub;

    const userToken = await  this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

    if(!userToken) {
      throw new AppError('Refresh Token does not exists!');
    }

    await this.usersTokensRepository.deleteById(userToken.id);


    const refresh_token = sign({email}, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_refresh_token_days
    });

    const expires_in = this.dayJsDateProvider.addDays(auth.expires_refresh_token_days);

    await this.usersTokensRepository.create({
      expires_in,
      refresh_token,
      user_id
    });

    const newToken = sign({}, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token
    })


    return {refresh_token, token: newToken};
  }
}

export { RefreshTokenUseCase}