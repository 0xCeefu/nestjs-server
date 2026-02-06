import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { th } from '@faker-js/faker';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService, private configService: ConfigService) {}
    async validateUser(email: string, password: string) {

        const user = await this.userService.findUserByEmail(email);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const isPasswordMatch = await compare(password, user.password);
        if (!isPasswordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return { id: user.id };
    }

    async validateRefreshToken(userId: number, refreshToken: string) {
        const user = await this.userService.findOneBy(userId);
        if (!user || !user.hashedRefreshToken) {
            throw new UnauthorizedException('Invalid refresh token');
        }
        const isRefreshTokenMatch = await argon2.verify(user.hashedRefreshToken, refreshToken);
        if (!isRefreshTokenMatch) {
            throw new UnauthorizedException('Invalid refresh token');
        }
        return { id: user.id };
    }

    async login(userId: number) {
        const { token, refreshToken } = await this.getJwtToken(userId);
        const hashedRefreshToken = await argon2.hash(refreshToken);
        await this.userService.setCurrentRefreshToken(userId, hashedRefreshToken);
        return { id: userId, token, refreshToken };
    }

    async getJwtToken(userId: number) {
        const payload = { id: userId };
        const token = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.getOrThrow('refreshJwt.secret'),
            expiresIn: this.configService.getOrThrow('refreshJwt.expiresIn'),
        });
        return { token, refreshToken };
    }

    async refreshJwtToken(userId: number) {
        const { token, refreshToken } = await this.getJwtToken(userId)
        const hashedRefreshToken = await argon2.hash(refreshToken);
        await this.userService.setCurrentRefreshToken(userId, hashedRefreshToken);
        return { id: userId, token, refreshToken };
    }

    async logout(userId: number) {
        await this.userService.setCurrentRefreshToken(userId, null);
    }

    async getUserRoleFromId(userId: number) {
        const user = await this.userService.findOne(userId);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        const userObject = { id: user.id, role: user.role };
        return userObject;
    }
}
