import { Injectable } from "@nestjs/common";
import { PrismaAdapter } from "src/config/prisma.adapter";
import { CreateTransactionDTO } from "./dto/create-transaction.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class TransactionRepository {
    constructor(private prismaAdapter: PrismaAdapter) {}

    async create(data: Prisma.TransactionCreateInput) {
        return this.prismaAdapter.transaction.create({
            data: data
        })
    }

    async find(id: string) {
        return this.prismaAdapter.transaction.findMany({
            where: {
                payerId: id
            }
        });
    }
}