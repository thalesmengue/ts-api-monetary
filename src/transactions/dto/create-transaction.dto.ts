export interface CreateTransactionDTO {
    amount: number;
    senderWalletId: string;
    receiverWalletId: string;
}