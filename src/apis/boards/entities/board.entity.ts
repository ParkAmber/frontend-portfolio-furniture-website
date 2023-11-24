import { Field, Int, ObjectType } from '@nestjs/graphql';
import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'
@Entity() //SQL 에서 타입스크립트 용  

//(ex) type Board 처럼 type들어가면 @ObjectType() 써주고, input CreateBoardInput 처럼 input @InputType() 써줌!!)
@ObjectType() //GraphQL에서의 타입지정 
  
export class Board{
    @PrimaryGeneratedColumn("increment") //SQL 에서 타입스크립트 용
    @Field(()=> Int)                    //GraphQL에서의 타입지정
    number: number;

    @Column()                           //SQL 에서 타입스크립트 용
    @Field(()=> String)                    //GraphQL에서의 타입지정
    writer: string

    @Column()                           //SQL 에서 타입스크립트 용
    @Field(()=> String)                    //GraphQL에서의 타입지정
    title: string

    @Column()                           //SQL 에서 타입스크립트 용
    @Field(()=> String)                    //GraphQL에서의 타입지정
    contents:string
}