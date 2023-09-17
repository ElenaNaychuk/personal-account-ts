export interface IContact {
    id: number;
    userId: string;
    firstName: string;
    phone: string;
    address: string;
}

export interface IContactInsert { //todo  в меcтах использования заменить на Partel
    firstName?: string;
    phone?: string;
    address?: string;
}

export type IContactUpdate = Partial<IContact> & { id: number }