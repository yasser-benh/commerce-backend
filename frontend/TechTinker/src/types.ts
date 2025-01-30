export interface Product {
    _id: Key | null | undefined;
    name: string;
    price: number;
    description: string;
    image: string;
    seller: string;
}