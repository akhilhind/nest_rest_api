import { Injectable } from '@nestjs/common';
// import { User } from './user.interface';
import { CreateUserDto } from './CreateUser.dto';
import { UpdateUserDto } from './UpdateUser.dto';
import { UserDto } from './User.dto';

@Injectable()
export class UsersService {
    private user_number: number = 4;
    private Users: UserDto[] = [
        {id: 1, name: "Akhil", age: 26, email: "akhil@rooter.io"},
        {id: 2, name: "Ansh", age: 17, email: "ansh@gmail.com"},
        {id: 3, name: "Ankit", age: 35, email: "ankit@gmail.com"}
    ]

    getAllUsers(): UserDto[] {
        return this.Users;
    }

    getUserById(user_id: number): UserDto {
        return this.Users.find(user => user.id == user_id);
    }

    addUser(user: CreateUserDto): {user_id: number} {
        let new_user_id = this.user_number++;
        this.Users.push({
            id: new_user_id,
            ...user
        });
        return {user_id: new_user_id};
    }

    deleteUser(user_id: number): string {
        let newData = this.Users.filter(user => user.id !== user_id);
        if (newData.length == this.Users.length) {
            return `No user with id:${user_id} exists.`;
        }
        this.Users = newData;
        return `User with id:${user_id} deleted.`;
    }

    updateUser(id: number, newUserData: UpdateUserDto): UserDto | string {
        let updatedUser: UserDto | null = null;
        this.Users = this.Users.map(user => {
            // return user.id == id ? {...user, ...newUserData} : user;
            if(user.id == id) {
                updatedUser = { ...user, ...newUserData};
                return updatedUser;
            }
            return user;
        });
        return updatedUser == null ? `No user with id: ${id} exists.` : updatedUser
    }
}
