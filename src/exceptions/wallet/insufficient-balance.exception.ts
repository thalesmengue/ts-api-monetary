import { HttpException, HttpStatus } from "@nestjs/common";

export class InsuficientBalanceException extends HttpException {
    constructor() {
        super(
            'Insufficient balance.',
            HttpStatus.FORBIDDEN
        );
    }
}