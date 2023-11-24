import { Field, InputType, Int } from "@nestjs/graphql"
import {Min} from 'class-validator'
import { ProductSaleslocationInput } from "src/apis/productsSaleslocations/dto/product-saleslocation.input"

@InputType()
export class CreateUserInput{
    @Field(()=> String)
    email: string

    @Field(()=> String)
    password: string

    @Field(()=> String)
    name: string

    @Min(0) //validation 체크해주기!
    @Field(()=> Int)
    age: number


}

// import { Field, Int, ObjectType } from "@nestjs/graphql"
// import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

// @Entity()
// @ObjectType()
// export class User{
//     @PrimaryGeneratedColumn("uuid")
//     @Field(()=> String)
//     id: string

//     @Column()
//     @Field(()=> String)
//     email: string

    
//     @Column()
//     // @Field(()=> String)//=> password는 브라우저에 전달하면 안됨!!
//     password: string

//     @Column()
//     @Field(()=> String)
//     name: string

//     @Column()
//     @Field(()=> Int)
//     age: number

// }