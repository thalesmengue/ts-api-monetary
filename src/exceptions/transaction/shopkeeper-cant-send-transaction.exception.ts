import { HttpException, HttpStatus } from "@nestjs/common";

export class ShopkeeperCantSendTransactionException extends HttpException {
    constructor() {
        super(
            'Shopkeeper does not have authorization to send transactions.', 
            HttpStatus.FORBIDDEN
        );
    }
}