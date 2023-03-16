import { User } from './user';

export interface LoginDto {
    username: User['username'];
    password: User['password'];
}
