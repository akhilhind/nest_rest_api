import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
// import { User } from './user.interface';
import { CreateUserDto } from './CreateUser.dto';
import { UpdateUserDto } from './UpdateUser.dto';
import { UserDto } from './User.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    getUsers(): CreateUserDto[]  {
        return this.userService.getAllUsers();
    }

    @Get('/info')
    getInfo() {
        return "This is a test app."
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number): UserDto {
        return this.userService.getUserById(id);
    }

    @Post('/addUser')
    addUser(@Body() user: CreateUserDto): { user_id: number } {
        return this.userService.addUser(user);
    }

    @Delete('/deleteUser/:id')
    deleteUser(@Param('id', ParseIntPipe) id: number) : string {
        // this ParseIntPipe is automatically parsing id to int.
        /*
        This method will delete user based on the id provided in the request.
        Response:
            1. User with provided id is deleted.
            2. No user with provided id is found in the db.
        */
        return this.userService.deleteUser(id);
    }

    @Patch(':id')
    updateUserInfo(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto): UserDto | string {
        return this.userService.updateUser(id, user);
    }
}
