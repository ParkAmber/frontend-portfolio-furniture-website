import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum POINT_TRANSACTION_STATUS_ENUM {
  PAYMENT = "PAYMENT",
  CANCEL = "CANCEL"
}

//graphql에 enum타입 등록해주기!
registerEnumType(POINT_TRANSACTION_STATUS_ENUM, {
  name: "POINT_TRANSACTION_STATUS_ENUM"
})

@Entity()
@ObjectType()
export class PointTransaction {
  @PrimaryGeneratedColumn('uuid')
  @Field(()=> String)
  id: string;

  @Column()
  @Field(()=> String)
  impUid: string;

  @Column()
  @Field(()=> Int)
  amount: number

  @Column({ type: "enum", enum: POINT_TRANSACTION_STATUS_ENUM })
  @Field(()=> POINT_TRANSACTION_STATUS_ENUM)
  status: POINT_TRANSACTION_STATUS_ENUM;

  @ManyToOne(() => User) //Many => PointTransaction, One => User (ex) user 1명이 여러개의 transaction 가능함!
  @Field(()=> User)
  user: User
    
  @CreateDateColumn()
  @Field(()=> Date)
  createdAt: Date
}
