import { CreateBestProductInput } from "../dto/create-best-product.input";
import { UpdateBestProductInput } from "../dto/update-best-product.input";
import { BestProduct } from "../entities/bestProduct.entity";

export interface IBestProductServiceCreate{
    createBestProductInput: CreateBestProductInput
}
export interface IBestProductServiceFindOne{
    productId: string;
}

export interface IBestProductServiceUpdate{
    productId: string,
    updateBestProductInput: UpdateBestProductInput
}
export interface IBestProductCheckSoldout{
    bestProduct: BestProduct
}

export interface IBestProductServiceDelete{
    productId: string
}