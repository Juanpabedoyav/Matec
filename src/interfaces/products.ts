export interface Items {
    products: Product[];
}

export type productID =`${string}-${string}-${string}-${string}-${string}`

export interface Product {
    id:         productID;
    name:       string;
    unit_price: number;
    stock:      number;
    type:       string;
    quantity:   number;
    totalprice: number | null;
}

export type defaultProducts = Omit<Product, 'id' | 'quantity' | 'totalprice'>



