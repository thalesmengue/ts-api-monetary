import { HttpException, HttpStatus } from "@nestjs/common";

export class WalletNotFoundException extends HttpException {
    constructor() {
        super(
            'Wallet not found.',
            HttpStatus.NOT_FOUND
        );
    }
}