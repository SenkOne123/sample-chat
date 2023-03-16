import { User } from './user';

export interface RegistrationData {
    username: User['username'];
    email: User['email'];
    password: User['password'];
}
