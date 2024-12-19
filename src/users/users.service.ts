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
        try {
            return this.Users;
        } catch (error) {
            throw new Error('Error fetching all users');
        }
    }

    getUserById(user_id: number): UserDto {
        try {
            const user = this.Users.find(user => user.id == user_id);
            if (!user) {
                throw new Error(`No user with id:${user_id} exists.`);
            }
            return user;
        } catch (error) {
            throw new Error(`Error fetching user by id: ${error.message}`);
        }
    }

    getEmailById(user_id: number): string {
        try {
            const user = this.Users.find(user => user.id == user_id);
            if (!user) {
                throw new Error(`No user with id:${user_id} exists.`);
            }
            return user.email;
        } catch (error) {
            throw new Error(`Error fetching email by id: ${error.message}`);
        }
    }

    getUserNameById(user_id: number): string {
        try {
            const user = this.Users.find(user => user.id == user_id);
            if (!user) {
                throw new Error(`No user with id:${user_id} exists.`);
            }
            return user.name;
        } catch (error) {
            throw new Error(`Error fetching username by id: ${error.message}`);
        }
    }

    addUser(user: CreateUserDto): {user_id: number} {
        try {
            const new_user_id = this.user_number++;
            this.Users.push({
                id: new_user_id,
                ...user
            });
            return { user_id: new_user_id };
        } catch (error) {
            throw new Error(`Error adding new user: ${error.message}`);
        }
    }

    deleteUser(user_id: number): string {
        try {
            let newData = this.Users.filter(user => user.id !== user_id);
            if (newData.length == this.Users.length) {
                throw new Error(`No user with id:${user_id} exists.`);
            }
            this.Users = newData;
            return `User with id:${user_id} deleted.`;
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }

    updateUser(id: number, newUserData: UpdateUserDto): UserDto | string {
        try {
            let updatedUser: UserDto | null = null;
            this.Users = this.Users.map(user => {
                if (user.id == id) {
                    updatedUser = { ...user, ...newUserData };
                    return updatedUser;
                }
                return user;
            });
            if (updatedUser == null) {
                throw new Error(`No user with id: ${id} exists.`);
            }
            return updatedUser;
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }
}
