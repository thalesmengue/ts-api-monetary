import { Injectable } from "@nestjs/common";
import { Prisma, Wallet } from "@prisma/client";
import { PrismaAdapter } from "src/config/prisma.adapter";

@Injectable()
export class WalletRepository {
    constructor(private prismaAdapter: PrismaAdapter) {}

    async create(data: Prisma.WalletCreateInput): Promise<Wallet> {
        return this.prismaAdapter.wallet.create({
            data: data
        })
    }

    async findById(id: string, join: boolean) {
        return this.prismaAdapter.wallet.findUnique({
            where: {
                id: id
            },
            include: {
                user: join
            }
        })
    }

    async updateAmount(id: string, amount: number) {
        return this.prismaAdapter.wallet.update({
            where: {
                id: id
            },
            data: {
                balance: amount
            }
        })
    }
}