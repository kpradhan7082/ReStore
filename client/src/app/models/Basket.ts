export interface Basket {
    id: number;
    items: BasketItem[];
  }
  
  export interface BasketItem {
    id: number;
    name: string;
    description: string;
    productId: number;
    price: number;
    pictureUrl: string;
    type: string;
    brand: string;
    quantity: number;
  }