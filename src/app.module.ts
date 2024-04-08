import { Module } from '@nestjs/common';
import { UsersController } from './users/user.controller';
import { UsersService } from './users/user.service';
import { UserModule } from './users/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { JwtGuard } from './jwt/jwt.guard';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './users/user.repository';
import { PrismaAdapter } from './config/prisma.adapter';
import { WalletService } from './wallets/wallet.service';
import { WalletRepository } from './wallets/wallet.repository';
import { TransactionModule } from './transactions/transaction.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TransactionModule
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtGuard
    },
    LocalStrategy,
    AuthService,
    UsersService,
    JwtService,
    UserRepository,
    PrismaAdapter,
    WalletService,
    WalletRepository
  ],
})

export class AppModule {}