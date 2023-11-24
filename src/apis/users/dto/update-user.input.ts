import { Field, InputType, Int, PartialType } from "@nestjs/graphql"
import {Min} from 'class-validator'
import { User } from "../entities/user.entity"
import { CreateUserInput } from "./create-user.input"
@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
    // name?: string
    //description?: string
    // price?: number ==> 이런식으로 됨!!

}