import { CreateProductInput } from "../dto/create-product.input";
import { UpdateProductInput } from "../dto/update-product.input";
import { Product } from "../entities/product.entity";
export interface IProductServiceCreate {
    createProductInput: CreateProductInput;
}
export interface IProductServiceFindOne {
    productId: string;
}
export interface IProductServiceFindAll {
    search?: string;
}
export interface IProductServiceUpdate {
    productId: string;
    updateProductInput: UpdateProductInput;
}
export interface IProductCheckSoldout {
    product: Product;
}
export interface IProductServiceDelete {
    productId: string;
}
export declare class FetchProductsArgs {
    search?: string;
    page?: number;
}
