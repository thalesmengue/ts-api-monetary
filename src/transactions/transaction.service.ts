import { WalletService } from "src/wallets/wallet.service";
import { TransactionRepository } from "./transaction.repository";
import { CreateTransactionDTO } from "./dto/create-transaction.dto";
import { WalletNotFoundException } from "src/exceptions/wallet/not-found.exception";
import { ShopkeeperCantSendTransactionException } from "src/exceptions/transaction/shopkeeper-cant-send-transaction.exception";
import { InsuficientBalanceException } from "src/exceptions/wallet/insufficient-balance.exception";
import { Injectable } from "@nestjs/common";
import { AuthorizationClient } from "src/clients/authorization.client";
import { UnauthorizedTransactionException } from "src/exceptions/transaction/unauthorized-transaction.exception";
import { Prisma, Transaction } from "@prisma/client";
import { NotificationClient } from "src/clients/notification.client";

@Injectable()
export class TransactionService {
    constructor(
        private transactionRepository: TransactionRepository,
        private walletService: WalletService,
        private authorizationClient: AuthorizationClient,
        private notificationClient: NotificationClient
    ) {}

    async create(data: CreateTransactionDTO): Promise<Transaction> {
        const payerWallet = await this.walletService.findById(data.senderWalletId, true);
        const payeeWallet = await this.walletService.findById(data.receiverWalletId, true);

        if (!payerWallet || !payeeWallet) {
            throw new WalletNotFoundException();
        }

        if (payerWallet.user.role == 'shopkeeper') {
            throw new ShopkeeperCantSendTransactionException();
        }

        if (payerWallet.balance < data.amount) {
            throw new InsuficientBalanceException();
        }

        let authorizationResponse = await this.authorizationClient.authorize();

        if (authorizationResponse.message != 'Authorized') {
            throw new UnauthorizedTransactionException();
        }

        this.walletService.updateAmount(data.senderWalletId, this.decrement(payerWallet.balance, data.amount));
        this.walletService.updateAmount(data.receiverWalletId, this.increment(payeeWallet.balance, data.amount));

        const transactionData: Prisma.TransactionCreateInput = {
            amount: data.amount,
            payer: {
                connect: {
                    id: payerWallet.user.id
                }
            },
            payee: {
                connect: {
                    id: payeeWallet.user.id
                    
                }
            },
            transaction_date: new Date()
        }

        let notificationResponse = await this.notificationClient.notify();

        if (notificationResponse.message != 'Success') {
            throw new Error('Error notifying the transaction');
        }

        return this.transactionRepository.create(transactionData);
    }

    increment(walletAmount: number, amount: number) {
        return walletAmount + amount;
    }

    decrement(walletAmount: number, amount: number) {
        return walletAmount - amount;
    }

    async find(id: string) {
        return this.transactionRepository.find(id);
    }
} 