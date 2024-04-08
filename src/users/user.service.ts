import { Prisma, User } from "@prisma/client";
import { UserRepository } from "./user.repository";
import { HttpStatus, Injectable, UseGuards } from "@nestjs/common";
import * as argon2 from "argon2";
import { z } from "zod";
import { ZodException } from "src/exceptions/zod/zod.exception";
import { WalletService } from "src/wallets/wallet.service";
import { randomInt } from "crypto";

@Injectable()
export class UsersService {
    constructor(
        private userRepository: UserRepository,
        private walletService: WalletService
    ) {}

    async getAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findById(id: string): Promise<User|null> {
        return this.userRepository.findById(id);
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const User = z.object({
            email: z.string().email(),
            password: z.string().min(6).max(20),
            document: z.string().min(11).max(14),
            firstName: z.string().min(2).max(40),
            lastName: z.string().min(2).max(40),
            role: z.string().optional()
        })

        const validatedData = User.safeParse(data)

        if (!validatedData.success) {
            throw new ZodException(
                'Some validation problems ocurred!',
                HttpStatus.BAD_REQUEST,
                validatedData.error.flatten()
            );
        }

        validatedData.data.password = await this.hashPassword(data.password);
        validatedData.data.role = this.getUserRole(validatedData.data.document);

        const createdUser = await this.userRepository.create(validatedData.data);

        const walletData : Prisma.WalletCreateInput = {
            balance: randomInt(10000, 100000),
            createdAt: new Date(),
            user: {
                connect: {
                    id: createdUser.id
                }
            }
        }

        await this.walletService.create(walletData);

        return createdUser;
    }

    async update(data: Prisma.UserUpdateInput, id: string): Promise<User> {
        const User = z.object({
            email: z.string().email(),
            firstName: z.string().min(2).max(40),
            lastName: z.string().min(2).max(40),
        })

        const validatedData = User.safeParse(data);

        if (!validatedData.success) {
            throw new ZodException(
                'Some validation problems ocurred!', 
                HttpStatus.BAD_REQUEST, 
                validatedData.error.flatten());
        }

        return this.userRepository.update(validatedData.data, id);
    }

    async delete(id: string): Promise<User> {
        return this.userRepository.delete(id);
    }

    hashPassword(password: string): Promise<string> {
        return argon2.hash(password);
    }

    getUserRole(document: string): string {
        if (document.length === 11) {
            return "common";
        }

        return "shopkeeper";
    }

    findByEmail(email: string): Promise<User|null> {
        return this.userRepository.findByEmail(email);
    }
}