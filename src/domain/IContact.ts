export interface IContact {
    id: number;
    userId: string;
    name: string;
    phone: string;
    address: string;
}

export type IContactUpdate = Partial<IContact> & { id: number }