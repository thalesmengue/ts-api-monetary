import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { CreateTransactionDTO } from "./dto/create-transaction.dto";

@Controller('transactions')
export class TransactionController {
    constructor(private transactionService: TransactionService) {}

    @Post()
    async store(@Body() data: CreateTransactionDTO) {
        return this.transactionService.create(data);
    }

    @Get()
    async index(@Req() req) {
        return this.transactionService.find(req.user.userId);
    }
}