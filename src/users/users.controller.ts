import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseUUIDPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UsersService } from './users.service';
import { User } from './interface/user.interface';
import { CreateUserDTO, ResponseUserDTO, UpdateUserDTO } from './dto/user.dto';

@Controller('users')
@UsePipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
}))
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get()
    async getAllUsers(): Promise<ResponseUserDTO[]> {
        const users: User[] = await this.userService.findAll()
        return users
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() user: CreateUserDTO): Promise<ResponseUserDTO> {
        const newUser = this.userService.create(user)
        return plainToInstance(ResponseUserDTO, newUser, { strategy: 'excludeAll' });
    }

    @Get(':id')
    async getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseUserDTO | undefined> {
        const user = this.userService.findById(id)
        if (user === undefined) {
            throw new NotFoundException('User not found')
        }
        return plainToInstance(ResponseUserDTO, user)
    }

    @Put(':id')
    async updateUser(@Body() user: UpdateUserDTO, @Param('id', ParseUUIDPipe) id: string): Promise<ResponseUserDTO> {
        const updateResult = await this.userService.updateUser(id, user)

        if (!updateResult) {
            throw new NotFoundException('Update unsuccessful')
        }
        const updatedUser = await this.userService.findById(id)
        return plainToInstance(ResponseUserDTO, updatedUser)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<boolean> {
        const deleteUser = await this.userService.delete(id)

        if (!deleteUser) {
            throw new NotFoundException('User not found')
        }
        return true
    }
}
