import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import * as argon2 from "argon2";
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService, 
        private jwtService: JwtService
        ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);

        if (!user) return null;

        const passwordValid = await argon2.verify(user.password, password);

        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }

        if (user && passwordValid) {
            return this.login(user);
        }

        return null;
    }

    async login(user: User) {
        const payload = { 
            username: user.email, 
            sub: user.id 
        };

        return {
            access_token: this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: 7200000
            }),
        };
    }
}