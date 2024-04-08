import { HttpException, HttpStatus } from "@nestjs/common";

export class ProblemOnNotificationService extends HttpException {
    constructor() {
        super(
            'A problem ocurred on the notification service', 
            HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}