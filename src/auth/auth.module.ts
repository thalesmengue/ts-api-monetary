import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/users/user.service';
import { UserRepository } from 'src/users/user.repository';
import { PrismaAdapter } from 'src/config/prisma.adapter';
import { AuthController } from './auth.controller';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { WalletRepository } from 'src/wallets/wallet.repository';
import { WalletService } from 'src/wallets/wallet.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN
      },
    }),
  ],
  providers: [
    AuthService, 
    UsersService, 
    JwtStrategy, 
    UserRepository, 
    PrismaAdapter, 
    WalletRepository, 
    WalletService
  ],
  controllers: [AuthController]
})
export class AuthModule {}