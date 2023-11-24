import { HttpException, Injectable, UnprocessableEntityException } from "@nestjs/common";
import axios from 'axios'
import { IIamportServiceCancel, IIamportServiceCheckPaid } from "./interfaces/iamport-service.interface";

// interface IIamportServiceCheckPaid{
//     impUid: string;
//     amount: number;
// }
@Injectable()
export class IamportService{

    async getToken(): Promise<string> {
        try {
            const result = await axios.post(`https://api.iamport.kr/users/getToken`, {
                imp_key: "4550747036701135",
                imp_secret: "7lbPS3sdQUYwFwENACsBfTxdvoAo19vndRgbOWL6lgAtNXfRHHaA7vml6dH2ShsGJnPJ7ZA7F6m0ipNc"
            });
        return result.data.response.access_token               
        } catch (error) {
            throw new HttpException(
                error.response.data.message,
                error.response.status,
            )            
        }    
    }
    async checkPaid({ impUid, amount }: IIamportServiceCheckPaid): Promise<void> {
        try {
        const token = await this.getToken()
        const result = await axios.get
            (
                `https://api.iamport.kr/payments/${impUid}`,
                { headers: { Authorization: token } }
            );    
            if (amount !== result.data.response.amount) 
                throw new UnprocessableEntityException("wrong payment!!")
            console.log("token:=========", token)
        } catch (error) {
            console.log(error)
            // throw new HttpException(
            //     error.response.data?.message || error.response.message,
            //     error.response.status || error.response.statusCode,
            // )
            
        }

    }

    async cancel({ impUid }: IIamportServiceCancel): Promise<number> {
        try {
       const token = await this.getToken();
        const result = await axios.post(
          "https://api.iamport.kr/payments/cancel",
          { imp_uid: impUid },
          { headers: { Authorization: token } }
        );
        return result.data.response.cancel_amount;      
        } catch (error) {
          throw new HttpException(
            error.response.data.message, 
            error.response.status
          )
        }
     
      }
}