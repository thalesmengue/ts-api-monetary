import { HttpException } from "@nestjs/common";
import { object, string } from "zod";

export class ZodException extends HttpException {
    constructor(message: string, status: number, errors: Record<string, unknown>) {
        super({
            message: message,
            errors: errors
        }, status)
    }
}