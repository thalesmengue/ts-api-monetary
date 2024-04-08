import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { UsersService } from "./user.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "@prisma/client";
import { Public } from "src/jwt/public.decorator";

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService) {}

    @Get()
    getAll(): Promise<User[]> {
        return this.usersService.getAll();
    }

    @Get('/:id')
    findOne(@Param('id') id: string): Promise<User|null> {
        return this.usersService.findById(id);
    }

    @Public()
    @Post()
    store(@Body() data: CreateUserDTO): Promise<User>  {
        return this.usersService.create(data);
    }

    @Put('/:id')
    update(@Body() data: UpdateUserDto, @Param('id') id: string): Promise<User> {
        return this.usersService.update(data, id);
    }

    @Delete('/:id')
    delete(@Param('id') id: string): Promise<User> {
        return this.usersService.delete(id);
    }
}