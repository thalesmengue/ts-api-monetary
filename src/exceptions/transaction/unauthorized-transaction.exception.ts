import { HttpException, HttpStatus } from "@nestjs/common";

export class UnauthorizedTransactionException extends HttpException{
    constructor() {
        super(
            'Unauthorized transaction.', 
            HttpStatus.UNAUTHORIZED
        );
    }
}