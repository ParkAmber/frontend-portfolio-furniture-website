import { Field, InputType } from "@nestjs/graphql";

@InputType()
//(ex) type Board 처럼 type들어가면 @ObjectType() 써주고, input CreateBoardInput 처럼 input @InputType() 써줌!!)
export class CreateBoardInput{
    @Field(()=> String)
    writer: string;

    @Field(()=> String)
    title: string;

    @Field(()=> String)
    contents: string;
}