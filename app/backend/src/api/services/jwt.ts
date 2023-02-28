import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import IPayload from '../interfaces/IPayload';

export default class jwtToken {
  private _secret = process.env.JWT_SECRET || 'trybeSecret';

  createToken(email: IPayload): string {
    const token = jwt.sign(email, this._secret);
    return token;
  }

  decodeToken(token: string): IPayload {
    const decodedToken = jwt.verify(token, this._secret) as IPayload;
    return decodedToken;
  }
}
