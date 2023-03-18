import { User } from './user';

export interface LoginData {
    username: User['username'];
    password: User['password'];
}
