import { Field, InputType, Int, PartialType } from "@nestjs/graphql"
import {Min} from 'class-validator'
import { CreateProductInput } from "./create-product.input"

// @InputType()
// export class UpdateProductInput{
//     @Field(()=> String, {nullable:true})
//     name?: string

//     @Field(()=> String, {nullable:true})
//     description?: string

//     @Min(0) //validation 체크해주기!
//     @Field(()=> Int, {nullable:true})
//     price?: number
// }


//graphQL용 utility type만들기
//==> PartialType(CreateProductInput)
//=> CreateProductInput을 상속받고, update에는 각 데이터가 무조건 있을 필요가 없으므로 Partial type으로 바꿔줌!!
@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
    // name?: string
    //description?: string
    // price?: number ==> 이런식으로 됨!!

}
//cf) pickType(CreateProductInput,['name','price]) => name, price만 뽑아쓰기
//cf) OmitType(CreateProductInput,['description']) => description만 제외해서 쓰기
//cf) PartialType(CreateProductInput) => '?'(있아도되고 없어도 됨) 만들기