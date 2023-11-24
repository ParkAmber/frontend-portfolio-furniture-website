import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './commons/filter/http-exception.filter';
import { graphqlUploadExpress } from 'graphql-upload';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //class-validation세팅해주기!
  app.useGlobalPipes(new ValidationPipe())

  //exception filter 세팅해주기!(=> nest.js에서 error체크해주는 것!)
  app.useGlobalFilters(new HttpExceptionFilter())

  //cors
  app.enableCors({
    // origin: 'http://localhost:3001',
    origin:"https://amberpark.site",
    credentials: true,
    // allowedHeaders: ['Content-Type', 'Authorization'], // Add the required headers
    exposedHeaders: ['set-cookie'],
    });
    // // Set a SameSite attribute for cookies
    // app.use((req, res, next) => {
    //   // Add the SameSite attribute to all cookies with 'Lax' as an example
    //   res.cookie('refreshToken', `Bearer ${req.headers.cookie}`, {
    //     sameSite: 'Lax',
    //     // Add other cookie options as needed
    //   });
    //   next();
    // });
  
  
   //upload files 세팅해주기!
   app.use(graphqlUploadExpress());
  await app.listen(3000);
}
bootstrap();
