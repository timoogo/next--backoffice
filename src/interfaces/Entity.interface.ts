export interface Entity {
    id: number;
    //[key: string]: string;
}

export interface Example extends Entity {
    name: string,
    email: string,
    password: string,
    age: number,
    updateDate: Date,
    phone: PhoneNumber,
}

export interface PhoneNumber {
    countryCode: string;
    format: string;
    number: string;
}
