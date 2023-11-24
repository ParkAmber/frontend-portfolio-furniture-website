import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { JwtModule } from '@nestjs/jwt'
import { JwtAccessStrategy } from "./strategies/jwt-access.strategy";
import { JwtRefreshStrategy } from "./strategies/jwt-refresh.strategy";
import { JwtGoogleStrategy } from "./strategies/jwt-social-google.strategy";
import { AuthController } from "./auth.controller";
@Module({
    // imports: [
    //     TypeOrmModule.forFeature([
    //           User
    //       ])
    //   ],
    imports: [
        JwtModule.register({}), //jwt사용하기 위한 설정
        UsersModule
    ],
      providers: [
          AuthResolver,
        AuthService,
        JwtAccessStrategy,
        JwtRefreshStrategy,
        JwtGoogleStrategy
        //   UsersService
  ],
  controllers: [
    AuthController
  ]
  })
      
export class AuthModule{}