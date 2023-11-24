import { InputType, OmitType } from "@nestjs/graphql";
import { ProductSaleslocation } from "../entities/productSaleslocation.entity";

//ProductSaleslocation타입에서 "id"만 빼고 input type으로 만들어주기!
@InputType()
export class ProductSaleslocationInput extends OmitType(
    ProductSaleslocation,
    ["id"],
    InputType) {
    //qqq: 33
}