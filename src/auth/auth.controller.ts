import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { Public } from "src/jwt/public.decorator";

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('/login')
    async login(@Request() req) {
        return this.authService.validateUser(req.body.email, req.body.password);
    }
}