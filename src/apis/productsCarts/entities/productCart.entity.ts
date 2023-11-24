import { Field, Int, ObjectType } from "@nestjs/graphql"
import { Product } from "src/apis/products/entities/product.entity"
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
@ObjectType()
export class ProductCart{
    @PrimaryGeneratedColumn("uuid")
    @Field(()=> String)
    id: string

    @Column()
    @Field(()=> String)
    user: string

    @Column()
    @Field(()=> String)
    name: string

    @Column()
    @Field(()=> Int)
    quantity: number

    @Column()
    @Field(()=> Int)
    price: number

    // @ManyToMany(() => Product, (products) => products.productTags)
    // @Field(()=> [Product])
    // products: Product[]
}