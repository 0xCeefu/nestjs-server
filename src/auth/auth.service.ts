import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}
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

    getJwtToken(userId: number) {
        const payload = { id: userId };
        return this.jwtService.sign(payload);
    }
}
