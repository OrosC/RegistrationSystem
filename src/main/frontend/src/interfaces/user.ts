import {Address} from "./address";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string
    password: string;
    imageUrl: string;
    gender: string;
    address: Address;
}