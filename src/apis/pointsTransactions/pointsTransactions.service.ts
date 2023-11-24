import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { IamportService } from '../iamport/import.service';
import { User } from '../users/entities/user.entity';
import { PointTransaction, POINT_TRANSACTION_STATUS_ENUM } from './entities/pointTransaction.entity';
import { IPointsTransactionsServiceCancel, IPointsTransactionsServiCecheckAlreadyCanceled, IPointsTransactionsServiceCheckDuplication, IPointsTransactionsServiCecheckHasCancelablePoint, IPointsTransactionsServiceCreate, IPointsTransactionsServiceCreateForPayment, IPointsTransactionsServiceFindByImpUidAndUser, IPointsTransactionsServiceFindOneByImpUid } from './interfaces/points-transactions-service.interface';

@Injectable()
export class PointsTransactionsService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointsTransactionsRepository: Repository<PointTransaction>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly dataSource: DataSource,
    private readonly iamportService: IamportService
  ) { }

  findAll(): Promise<PointTransaction[]> {
    return this.pointsTransactionsRepository.find();
  }
  

  
  //이미 결제됬던 아이디인지 검증
  findOneByImpUid({ impUid }:IPointsTransactionsServiceFindOneByImpUid): Promise<PointTransaction> {
    return this.pointsTransactionsRepository.findOne({ where: { impUid: impUid } });
  }

  async checkDuplication({impUid}: IPointsTransactionsServiceCheckDuplication):Promise<void> {
    const result = await this.findOneByImpUid({ impUid })
    if(result) throw new ConflictException("already existed ID")
  }
//
//   async create({ impUid, amount, user: _user, status = POINT_TRANSACTION_STATUS_ENUM.PAYMENT }: IPointsTransactionsServiceCreate): Promise<PointTransaction>
//   {
//     //결제완료 상태인지 검증
//     // await this.iamportService.checkPaid({impUid, amount})

//     //이미 결제됬던 아이디인지 검증
//     // this.pointsTransactionsRepository.findOne({ where: { impUid } });
//     // const result = await this.findOneByImpUid({ impUid })
//     // if(result) throw new ConflictException("already existed ID")
//     // await this.checkDuplication({ impUid })
// console.log(impUid,amount)

//     //한번에 묶어서 하나 실패하면 다 실패로 햐주고, 다 성공해야 db에 저장시키기!
//     const queryRunner = this.dataSource.createQueryRunner()
//     await queryRunner.connect()
//     await queryRunner.startTransaction('SERIALIZABLE')

//     try {
// //========.  startTransaction(시작!)
//     //1. PointTransaction 테이블에 거래기록 1줄 생성 & 저장
//     const pointTransaction =  this.pointsTransactionsRepository.create({
//       impUid,
//       amount,
//       user: _user,
//       status,
//     })    
//     // await this.pointsTransactionsRepository.save(pointTransaction)
//     await queryRunner.manager.save(pointTransaction)

//     // throw new Error
//     //2. 유저의 돈 찾아오기 & update하기 => 따로 lock안걸어줌!
//     //=> but숫자일때만 가능(ex) 좌석같은건 안됨(이건 pointsTransaction.service2.ts파일 사용하기!)=> 직접 lock걸기
//       const id = _user.id
//       queryRunner.manager.increment(
//         User,
//         { id: id },
//         'point',
//         amount
//     )
    
//     await queryRunner.commitTransaction();
    
// //========.  commit(저장!)
//     //3. 최종결과 브라우저에 돌려주기
//       return pointTransaction
      
//     } catch (error) {
//       //실패하면 그동안 했던거 다 취소해주기!
//       await queryRunner.rollbackTransaction()
//     } finally {
//       //finally => 성공하든 실패하든 마지막에 작동하는 코드
//       //release()가 없으면, commit 끝나도 connection 안끝남. but, 애러 나면 끝남!
//       await  queryRunner.release() //마지막앤 꼭!! db와 연결끊어쥬기! => 안그럼 애러남!
//     }    
//   }
async create({
  impUid,
  amount,
  user: _user,
  status = POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
}: IPointsTransactionsServiceCreate): Promise<PointTransaction> {
  // 1. PointTransaction 테이블에 거래기록 1줄 생성
  const pointTransaction = this.pointsTransactionsRepository.create({
    impUid,
    amount,
    user: _user,
    status,
  });
  await this.pointsTransactionsRepository.save(pointTransaction);

  // 2. 유저의 돈 찾아오기
  const user = await this.usersRepository.findOne({
    where: { id: _user.id },
  });

  // 3. 유저의 돈 업데이트
  await this.usersRepository.update(
    { id: _user.id },
    { point: user.point + amount },
  );

  // 4. 최종결과 브라우저에 돌려주기
  return pointTransaction;
}

  async createForPayment({
    impUid,
    amount,
    user,
  }: IPointsTransactionsServiceCreateForPayment): Promise<PointTransaction> {
    await this.iamportService.checkPaid({ impUid, amount }); // 결제완료 상태인지 검증하기
    await this.checkDuplication({ impUid }); // 이미 결제됐던 id인지 검증하기

    return this.create({impUid, amount, user})

  }
  findByImpUidAndUser({impUid, user}: IPointsTransactionsServiceFindByImpUidAndUser): Promise<PointTransaction[]> {
    return this.pointsTransactionsRepository.find({
    where: { impUid, user: { id: user.id } },
    relations: ['user'],
    })
  }
  
  checkAlreadyCanceled({
    pointTransactions
  }: IPointsTransactionsServiCecheckAlreadyCanceled): void {
    const canceledPointTransactions = pointTransactions.filter(
      el => el.status === POINT_TRANSACTION_STATUS_ENUM.CANCEL
    )
    if (canceledPointTransactions.length)
      throw new ConflictException("already canceld ID")
  }

  checkHasCancelablePoint({
    pointTransactions
  }: IPointsTransactionsServiCecheckHasCancelablePoint): void {
    const paidPointTransactions = pointTransactions.filter(
      el => el.status === POINT_TRANSACTION_STATUS_ENUM.CANCEL
    )
    if (!paidPointTransactions.length)
      throw new UnprocessableEntityException("there is no payment")
    
    if (paidPointTransactions[0].user.point < paidPointTransactions[0].amount) {
      throw new UnprocessableEntityException("point is not enough")
    }
        
  }

  async cancel({ impUid, user }: IPointsTransactionsServiceCancel):Promise<PointTransaction> {
    //1. 결제내역 조회
    const pointTransactions = await this.findByImpUidAndUser({ impUid, user })
    
    //2-1. 검증하기 이미 취소됐던 id인지 검증하기
    this.checkAlreadyCanceled({pointTransactions})


    //2-2. 포인트가 취소하기에 충분히 있는지
    this.checkHasCancelablePoint({pointTransactions})

    //2-3. 결제 취소하기
    const canceledAmount = await this.iamportService.cancel({ impUid })
    

    //취소된 결과 db에 등록하기
    return this.create({
      impUid, amount: -canceledAmount, user, status: POINT_TRANSACTION_STATUS_ENUM.CANCEL
    })
  }
}
