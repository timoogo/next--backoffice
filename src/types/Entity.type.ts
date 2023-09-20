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
    countryCode: string;  // Par exemple: "+33" pour la France
    format: string;       // Par exemple: "xx xx xx xx xx" pour la France
    number: string;       // Reste du numéro sans le code du pays
}
