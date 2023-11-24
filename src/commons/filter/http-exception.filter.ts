import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

// implements=> class에서 type사용하는 법! => 여기선 ExceptionFilter타입 사용해줌
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException) {
        const status = exception.getStatus()
        const message = exception.message

        console.log("===============")
        console.log("예외발생!")
        console.log("예외코드: ", status)
        console.log("예외메세지: ", message)
        console.log("===============")
    }
}
