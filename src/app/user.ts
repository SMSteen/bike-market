import { Bike } from './bike';

export class User {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    pwconf: string;
    bikes: Bike[];
}