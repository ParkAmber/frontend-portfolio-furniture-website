import { AddToCartInput } from "../dto/create-cart-product.input";

export interface IProductsCartsServiceBulkInsert{
    names: {
        name: string
    }[]
}
export interface IProductsTagsServiceFindByNames{
    tagNames: string[]
}
export interface IProductServiceCreateAddToCart{
    addToCartInput: AddToCartInput
}
export interface IProductCartServiceFindOne{
    productId: string;
}