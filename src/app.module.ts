import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { BoardsModule } from './apis/boards/boards.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Board } from './apis/boards/entities/board.entity';
import {ConfigModule} from '@nestjs/config'
import { ProductsModule } from './apis/products/products.module';
import { ProductCategory } from './apis/productsCategories/entities/productCategory.entity';
import { ProductsCategoriesModule } from './apis/productsCategories/productsCategories.module';
import { UsersModule } from './apis/users/users.module';
import { AuthModule } from './apis/auth/auth.module';
import { ProductCartsModule } from './apis/productsCarts/products.carts.module';
import { FilesModule } from './apis/files/files.module';
import { BestProductsModule } from './apis/bestProduct/bestProducts.module';
import { RedisClientOptions } from 'redis'
import * as redisStore from 'cache-manager-redis-store'
import { PointsTransactionsModule } from './apis/pointsTransactions/pointsTransactions.module';
import { PaymentsMoudle } from './apis/payments/payments.module';

@Module({
    imports: [
        //Module들 등록하기
        BoardsModule,
        ProductsModule,
        ProductsCategoriesModule,
        UsersModule,
        AuthModule,
        PointsTransactionsModule,
        PaymentsMoudle,
        ProductCartsModule,
        FilesModule,
        BestProductsModule,
        ConfigModule.forRoot(),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver, 
            autoSchemaFile: 'src/commons/graphql/schema.gql',//typeDefs 자동생성할 위치!
            context: ({ req, res }) => ({ req, res }), //req는 이거 안작성해도 사용가능하지만, res는 작성해야함!
            
            //최신버전에서 cors 문제 생기면 이거 추가해 주기!
            // cors: {
            //     origin: "http://localhost:8080", // 요청을 보내는 클라이언트의 주소를 명시
            //     credentials: true,
            // },
        }),
        TypeOrmModule.forRoot({
            type: process.env.DATABASE_TYPE as 'mysql',
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE,

            //entities=> entitiy 파일들 등록하기
            // entities: [Board], 
            entities: [__dirname + "/apis/**/*.entity.*"],// apis 폴더에서 entity.어쩌구 인 파일들 가 등록하기!
            synchronize: true,
            logging:true
            
        }),
        CacheModule.register<RedisClientOptions>({
            store: redisStore,
            url: "redis://my-redis:6379",
            isGlobal: true,
        })
    ],
    // controllers: [AppControllers],
    // providers: [AppService], //=> new AppController(AppService)
})
export class AppModule {}
