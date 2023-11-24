import { Field, Int, ObjectType } from "@nestjs/graphql"
import { ProductCategory } from "src/apis/productsCategories/entities/productCategory.entity"
import { ProductFile } from "src/apis/productsFiles/entities/productFile.entity"
import { ProductSaleslocation } from "src/apis/productsSaleslocations/entities/productSaleslocation.entity"
import { ProductTag } from "src/apis/productsTags/entities/productTag.entity"
import { User } from "src/apis/users/entities/user.entity"
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
@ObjectType()
export class Product{
    @PrimaryGeneratedColumn("uuid")
    @Field(()=> String)
    id: string

    @Column()
    @Field(()=> String)
    name: string
 
    @Column()
    @Field(()=> String)
    description: string

    @Column()
    @Field(()=> Int)
    price: number

    @Field(()=> Boolean)
    @Column({default: false})
    isSoldout: boolean

    // @JoinColumn() //1대 1 관계에서만 해주기
    // @OneToOne(()=> ProductSaleslocation) //Product와 ProductSaleslocation를 1대 1 연결해주기
    // @Field(()=> ProductSaleslocation)
    // productSaleslocation: ProductSaleslocation

    @ManyToOne(()=> ProductCategory) //Product(=> many)와 ProductCategory(=>one)을 다대 1 연결해주기
    @Field(()=> ProductCategory)
    productCategory: ProductCategory

    @ManyToOne(() => User)
    @Field(()=> User)
    user: User

    @JoinTable()
    @Field(()=> [ProductTag])
    @ManyToMany(()=> ProductTag,(productTags)=> productTags.products )
    productTags: ProductTag[]

    @JoinTable()
    @Field(()=> [ProductFile])
    @ManyToMany(()=> ProductFile,(files)=> files.products )
    files: ProductFile[]

    //@DeleteDateColumn => soft delete 가능하게하는 컬럼! 
    @DeleteDateColumn()
    deletedAt: Date;

    @CreateDateColumn()
    @Field(()=> Date)
    createdAt: Date;
}