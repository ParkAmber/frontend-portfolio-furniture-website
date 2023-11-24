import { UseGuards } from "@nestjs/common";
import { Args, Context, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'
import { GqlAuthGuard } from "../auth/guards/gql-auth.guard";
import { IContext } from "src/commons/interfaces/context";
import { UpdateUserInput } from "./dto/update-user.input";
// import { UpdateUserInput } from "../products/dto/update-user.input ";

// interface IAuthUser{
//     user?: {
//         id: string
//     }
// }

// interface IContext{
// // req: Request & { user?: { id: string } } => req.user.id 이렇게 사용가능!
//     // req: Request & {
//     //     user?: {
//     //         id: string
//     //     }
//     // }
//     //||
//     //||
//     //||
//     req: Request & IAuthUser
//     res: Response
// }

@Resolver()
export class UsersResolver{
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Query(()=> [User])   
    fetchUsers():Promise<User[]> {
       return this.usersService.findAll()
    }

    // @UseGuards=> 검증되지 않은 회원(아이디가 존재하지 않음/비밀번호 오류 등)이면 Guard에서 에러를 반환
    // @UseGuards(GqlAuthAccessGuard) //authorization처리하기 => 즉, 토큰있어야 사용가능함!
    @Query(()=> User)
    fetchUser(
        @Args("email") email: string
     //@Context()==> request, response, header등이 들어있음!
        // @Context() context: IContext
       
    ): Promise<User> {
        // console.log("==================")
        // console.log(context.req.user) //유저 ID
        // //findOne({id: '유저 ID'})
        // // const productId = context.req.user
        // console.log("==================")
        // return "authorization success"
        // const email = "bbb@abc.com"
        return this.usersService.findOneByEmail({email})
    }
//   //1개 조회
//   @Query(()=> Product)
//   fetchProduct(
//       @Args("productId") productId: string):Promise<Product> {
//      return this.productsService.findOne({productId})
//   }
    @Mutation(()=> User)
    createUser(
        @Args("email") email: string,
        @Args("password") password: string,
        @Args("name") name: string,
        // @Args({name: "age", type:()=> Int}) age: number,
    ):Promise<User> {
       return this.usersService.create({email,password,name})
    }

    @Mutation(()=> User, {nullable: true})
    updateUser(
        @Args("productId") productId: string,
        // @Args("email") email: string,
        // @Args("password") password: string,
        // @Args("name") name: string,
        // @Args({name: "age", type:()=> Int}) age: number,
        @Args("updateUserInput") updateUserInput: UpdateUserInput
    ):Promise<User> {
    //   
        return this.usersService.update({productId, updateUserInput})
    }
    // @Mutation(() => Product)
    // updateProduct(
    //     @Args("productId") productId: string,
    //     @Args("updateProductInput") updateProductInput: UpdateProductInput
    // ):Promise<Product> {
    //    return this.productsService.update({productId, updateProductInput})
    // }

    //delete
    @Mutation(() => Boolean)
    deleteUser(
        @Args("productId") productId: string
        ):Promise<boolean> {
      return this.usersService.delete({productId})
        }
    
//  === 토큰 기반 인증(Authentication) APIs    
    // 비밀번호를 변경하는 API 
    // @UseGuards(GqlAuthGuard('myAuthorization'))
    @Mutation(()=> User)
    updateUserPwd(
        // @Args("email") email: string,
        @Args("productId") productId: string,
        @Args("password") password: string
    ):Promise<User> {
       return this.usersService.updatePwd({  productId, password })
    }
    //로그인한 user 한 사람을 조회하는 API
        // @UseGuards=> 검증되지 않은 회원(아이디가 존재하지 않음/비밀번호 오류 등)이면 Guard에서 에러를 반환
        // @UseGuards(GqlAuthGuard('myAuthorization')) //authorization처리하기 => 즉, 토큰있어야 사용가능함!
    @Query(()=> User)
    fetchLoginUser(
            @Args("email") email: string
         //@Context()==> request, response, header등이 들어있음!
            // @Context() context: IContext
           
        ): Promise<User> {
            // console.log("==================")
            // console.log(context.req.user) //유저 ID
            // //findOne({id: '유저 ID'})
            // // const productId = context.req.user
            // console.log("==================")
            // return "authorization success"
            // const email = "bbb@abc.com"
            return this.usersService.findOneByEmail({email})
    }
    
    //로그인한 user 한 사람을 삭제하는 API
    @UseGuards(GqlAuthGuard('myAuthorization')) //authorization처리하기 => 즉, 토큰있어야 사용가능함!
    @Mutation(() => Boolean)
    deleteLoginUser(
        @Args("productId") productId: string
        ):Promise<boolean> {
      return this.usersService.delete({productId})
        }
 }
