import { type } from "os";

type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    password: string;
    createdAt: string;
    isAdmin: boolean;
}
type Organization = {
    id: number;
    name: string;
    email: string;
    phone: string;
    description: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}


type Event = {
    id: number;
    name: string;
    description: string;
    image: string;
    location: string;
    type: string;
    date: string;
    duration: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}