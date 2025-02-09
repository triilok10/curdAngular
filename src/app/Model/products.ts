export interface Products {
    productItemID: number;
    price: number;
    rating: number;
    productName: string;
    description: string;
    status: boolean;
  }
  export interface ProductResponse{
    apiStatus:number,
    message:string,
    productItems: Products[]; 
  }

  