import { Field, ObjectType } from "@nestjs/graphql"
import { Product } from "src/apis/products/entities/product.entity"
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"



@Entity()
@ObjectType()
export class ProductFile {
    @PrimaryGeneratedColumn("uuid")
    @Field(() => String)
    id: string

    @Column()
    @Field(() => String)
    name: string

    // @ManyToMany(() => Product)
    // @Field(()=> [Product])
    // products: Product[]

    // @ManyToMany(() => Product, (products) => products.productTags)
    // @Field(()=> [Product])
    // products: Product[]
    @ManyToMany(() => Product, (products) => products.files)
    @Field(() => [Product])
    products: Product[]

}