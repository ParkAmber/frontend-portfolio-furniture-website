import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import {  IPwdUpdate, IUserDelete, IUserServiceById, IUsersServiceCreate, IUsersServiceFindOneByEmail, IUserUpdate } from "./interfaces/users-service.interface";
import * as bcrypt from 'bcrypt';
// interface IUsersServiceCreate{
//     email: string
//     password: string
//     name: string
//     age: number
// }
// interface IUsersServiceFindOneByEmail{
//     email: string
// }
@Injectable()
export class UsersService{ 
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) { }
    
    //email존재여부 검증 함수
    findOneByEmail({email}: IUsersServiceFindOneByEmail): Promise<User> {
       return this.usersRepository.findOne({ where: { email } });
    }

    //유저 생성 함수
    async create({ email, password, name }: IUsersServiceCreate): Promise<User> {
       const user = await this.findOneByEmail({email})
       if (user) throw new ConflictException("The email already exists")
            
        const hashedPassword = await bcrypt.hash(password, 10) //salt를 10번 하기
        
        return this.usersRepository.save({
            email,
            password: hashedPassword,
            name,
           
        })
    }
    //데이터 조회=> nest.js에서는 await안해도 자동으로 기다려줌(but express.js에선 await해줘야함!!)
    findAll(): Promise<User[]>{
        return this.usersRepository.find(
            // {
            // relations: ['productSaleslocation', 'productCategory'],//productSaleslocation, product들 합쳐서 가져오기!         
            // }
        )
        // return this.productsRepository.find({where: {isDeleted: false}}) // // 가짜로 삭재하는 방법(soft delete) - isDeleted
        //return this.productsRepository.find({where: {deletedAt: null}})  //. // 가짜로 삭재하는 방법(soft delete) - deletedAt
    }
    findOneById({productId}: IUserServiceById):Promise<User>{
        return this.usersRepository.findOne({
            where: { id: productId },
            // relations: ['productSaleslocation','productCategory','productTags'],//producsSaleslocation, product들 합쳐서 가져오기!
        })
    }

       //데이터 수정
       async update({ productId, updateUserInput }: IUserUpdate): Promise<User> {
        
        //1. 수정할 데이터 찾기
        //this.productsRepository.findOne({ where: { id: productId } }) => this.findOne({productId}) 이게 더 안정함!=> 새로만드는게 아니라 있는거 가져다쓰므로 더 좋고 안전함!
        const product = await this.findOneById({ productId })
        
        const hashedPassword = await bcrypt.hash(updateUserInput.password, 10) //salt를 10번 하기
        console.log(updateUserInput)
        return this.usersRepository.save({
            // email,
            // password: hashedPassword,
            // name,
            // age
            ...product,
            ...updateUserInput,
           password: hashedPassword
        })
       
    
       }
    
        //데이터 삭제
   
        async delete({ productId }: IUserDelete): Promise<boolean> {
            //=>1. 진짜로 삭재하는 방법
           //   const result = await this.productsRepository.delete({id: productId})
           //   return result.affected ? true : false //삭제 잘 됫으면, true 아니면 false 보내주기
           
           //  //=>2. 가짜로 삭재하는 방법(soft delete) - isDeleted
           // this.productsRepository.update({ id: productId }, { isDeleted: true });
   
            //=>3. 가짜로 삭재하는 방법(soft delete) - deletedAt
           //  this.productsRepository.update({ id: productId }, { deletedAt: new Date() });
   
           //=>4. typeorm이 제공헤주는 기능 사용하기(softRemove)=>  find()등 fetch할때 뭐 안해줘도 자동으로 delete된거 빼고 가져옴!
           //                                              => 장점: 여러 id 한번에 삭제가능 ex).softRemove([{ id: aaa }, { id: bbb }, { id: qqq }])
           //                                              => 단점: id로만 삭제 가능!
           // this.productsRepository.softRemove({ id: productId })
           
           //=>5. typeorm이 제공헤주는 기능 사용하기(softDelete) =>find()등 fetch할때 뭐 안해줘도 자동으로 delete된거 빼고 가져옴!
           //                                              => 장점:다른 컬럼으로 삭제가능!
           //                                              => 단점:여러 id 한번에 삭제가능x!
           const result = await this.usersRepository.softDelete({ id: productId })
           return result.affected ? true: false //삭제 잘 됫으면, true 아니면 false 보내주기
        }
    
//  === Password APIs
    
           //Password 수정
           async updatePwd({productId, password }: IPwdUpdate): Promise<User> {
        
            //1. 수정할 데이터 찾기
            //this.productsRepository.findOne({ where: { id: productId } }) => this.findOne({productId}) 이게 더 안정함!=> 새로만드는게 아니라 있는거 가져다쓰므로 더 좋고 안전함!
            const product = await this.findOneById({ productId })
            
            const hashedPassword = await bcrypt.hash(password, 10) //salt를 10번 하기
            console.log(password)
            return this.usersRepository.save({
                // email,
                // password: hashedPassword,
                // name,
                // age
                ...product,
               
               password: hashedPassword
            })
            // return result.affected ? true: false //삭제 잘 됫으면, true 아니면 false 보내주기
        
           }
}
