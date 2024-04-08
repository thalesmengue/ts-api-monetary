import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./user.controller";
import { UsersService } from "./user.service";
import { UserRepository } from "./user.repository";
import { PrismaAdapter } from "src/config/prisma.adapter";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "src/strategy/local.strategy";
import { AuthService } from "src/auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { WalletRepository } from "src/wallets/wallet.repository";
import { WalletService } from "src/wallets/wallet.service";

@Module({
    imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
    controllers: [UsersController],
    providers: [
        UsersService, 
        UserRepository, 
        PrismaAdapter, 
        LocalStrategy, 
        AuthService, 
        JwtService, 
        WalletRepository,
        WalletService
    ],
})
export class UserModule {}