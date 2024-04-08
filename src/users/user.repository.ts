import { PrismaAdapter } from "src/config/prisma.adapter";
import { Prisma, User } from "@prisma/client"
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository {
    constructor(private prismaAdapter: PrismaAdapter) { }

    async find(): Promise<User[]> {
        return this.prismaAdapter.user.findMany();
    }

    async findById(id: string): Promise<User|null> {
        return this.prismaAdapter.user.findUnique({
            where: {
                id: id
            }
        })
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.prismaAdapter.user.create({
            data
        });
    }

    async update(data: Prisma.UserUpdateInput, id: string): Promise<User> {
        return this.prismaAdapter.user.update({
            where: {
                id: id
            },
            data
        });
    }

    async delete(id: string): Promise<User> {
        return this.prismaAdapter.user.delete({
            where: {
                id: id
            }
        })
    }

    async findByEmail(email: string): Promise<User|null> {
        return this.prismaAdapter.user.findUnique({
            where: {
                email: email
            }
        })
    }
}