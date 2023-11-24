// import { AddToCartInput } from "../../productsCarts/dto/add-to-cart-product.input";
import { ArgsType, Field, Int } from "@nestjs/graphql";
import { CreateProductInput } from "../dto/create-product.input";
import { UpdateProductInput } from "../dto/update-product.input";
import { Product } from "../entities/product.entity";

export interface IProductServiceCreate{
    createProductInput: CreateProductInput
}

export interface IProductServiceFindOne{
    productId: string;
}
export interface IProductServiceFindAll{
    search?: string;
}
export interface IProductServiceUpdate{
    productId: string,
    updateProductInput: UpdateProductInput
}
export interface IProductCheckSoldout{
    product: Product
}

export interface IProductServiceDelete{
    productId: string
}

@ArgsType()
export class FetchProductsArgs {
  @Field({ nullable: true })
  search?: string;
    
  @Field((type) => Int, { nullable: true })
  page?: number;
}
