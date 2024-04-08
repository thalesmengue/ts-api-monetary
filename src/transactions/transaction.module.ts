import { Module } from "@nestjs/common";
import { UsersService } from "src/users/user.service";
import { UserRepository } from "src/users/user.repository";
import { PrismaAdapter } from "src/config/prisma.adapter";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "src/strategy/local.strategy";
import { AuthService } from "src/auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { WalletRepository } from "src/wallets/wallet.repository";
import { WalletService } from "src/wallets/wallet.service";
import { TransactionController } from "./transaction.controller";
import { TransactionService } from "./transaction.service";
import { TransactionRepository } from "./transaction.repository";
import { AuthorizationClient } from "src/clients/authorization.client";
import { NotificationClient } from "src/clients/notification.client";

@Module({
    imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
    controllers: [TransactionController],
    providers: [
        UsersService, 
        UserRepository, 
        PrismaAdapter, 
        LocalStrategy, 
        AuthService, 
        JwtService, 
        WalletRepository,
        WalletService,
        TransactionService,
        TransactionRepository,
        AuthorizationClient,
        NotificationClient
    ],
})
export class TransactionModule {}