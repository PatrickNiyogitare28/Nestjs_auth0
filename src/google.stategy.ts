import {PassportStrategy} from '@nestjs/passport';
import {Strategy, VerifyCallback} from 'passport-google-oauth20';
import {Injectable} from '@nestjs/common';


Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google'){
    constructor(){
        super({
            clientID: '',
            clientSecret: '',
            callbackURL: '', //some thing like http://localhost:3000/auth/google/callback on dev env or https:test.com/auth/google/callback on prod env
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
