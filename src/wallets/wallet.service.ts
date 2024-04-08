import { Prisma, Wallet } from "@prisma/client";
import { WalletRepository } from "./wallet.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class WalletService {
    constructor(private walletRepository: WalletRepository) {}

    async create(data: Prisma.WalletCreateInput): Promise<Wallet> {
        return this.walletRepository.create(data);
    }

    async findById(id: string, join: boolean) {
        return this.walletRepository.findById(id, join);
    }
    
    async updateAmount(id: string, amount: number) {
        return this.walletRepository.updateAmount(id, amount);
    }
}