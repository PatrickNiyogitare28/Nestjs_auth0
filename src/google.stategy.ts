import {PassportStrategy} from '@nestjs/passport';
import {Strategy, VerifyCallback} from 'passport-google-oauth20';
import {Injectable} from '@nestjs/common';


Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google'){
    constructor(){
        super({
            clientID: '864533887604-jf77e415ojl2njgd26k4reilpck874cr.apps.googleusercontent.com',
            clientSecret: 'tntHJpaxEbp8cBpMoF3b2GAO',
            callbackURL: 'http://localhost:3000/auth/google/callback',
            scope: ['email','profile']
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>{
      const {name, emails, photos} = profile;
      const user = { 
          email: emails[0].value,
          firstname: name.givenName,
          lastname: name.familyName,
          picture: photos[0].value,
          accessToken
      }
      done(null, user);
    }
}
