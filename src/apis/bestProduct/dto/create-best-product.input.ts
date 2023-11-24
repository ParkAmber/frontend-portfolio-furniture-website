import { Field, InputType, Int } from "@nestjs/graphql"
import {Min} from 'class-validator'
import { ProductSaleslocationInput } from "src/apis/productsSaleslocations/dto/product-saleslocation.input"

@InputType()
export class CreateBestProductInput{
    @Field(()=> String)
    name: string

    @Field(()=> String)
    description: string

    @Min(0) //validation 체크해주기!
    @Field(()=> Int)
    price: number

    // @Field(()=> ProductSaleslocationInput, {nullable: true})
    // productSaleslocation: ProductSaleslocationInput

    @Field(()=> String)
    productCategoryId: string

    @Field(()=> [String])
    productTags: string[]

    @Field(()=> [String])
    files: string[]

    @Min(0) //validation 체크해주기!
    @Field(()=> Int)
    star: number
}