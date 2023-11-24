import { Field, Int, ObjectType } from "@nestjs/graphql"
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
@ObjectType()
export class User{
    @PrimaryGeneratedColumn("uuid")
    @Field(()=> String)
    id: string

    @Column()
    @Field(()=> String)
    email: string

    
    @Column()
    // @Field(()=> String)//=> password는 브라우저에 전달하면 안됨!!
    password: string

    @Column()
    @Field(()=> String)
    name: string

    // @Column()
    // @Field(()=> Int)
    // age: number
    
    @DeleteDateColumn()
    deletedAt: Date;

    @Column({ default: 0 })
    @Field(()=> Int)
    point: number
    
    @Column({ default: 0 })
    @Field(()=> Int)
    money: number
}