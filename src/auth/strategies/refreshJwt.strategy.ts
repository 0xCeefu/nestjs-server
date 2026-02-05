import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
    constructor(private configService: ConfigService, private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.getOrThrow<string>("refreshJwt.secret"),
            ignoreExpiration: false,
            passReqToCallback: true,
        })
    }

    async validate(req: Request, payload) {
        const token = req.get('Authorization')!.replace('Bearer ', '').trim();
        const userId = payload.id;
        return await this.authService.validateRefreshToken(userId, token);
    }
}