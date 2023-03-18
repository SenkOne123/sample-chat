import { User } from './user';

export interface Role {
    id: number;
    value: string;
    description: string;
    users: User[];
}
