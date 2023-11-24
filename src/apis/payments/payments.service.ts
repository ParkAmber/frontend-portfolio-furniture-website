//**** 1단계
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { DataSource, Repository } from 'typeorm';
// import { Payment } from './entities/payment.entity';

// @Injectable()
// export class PaymentsService {
//   constructor(
//     @InjectRepository(Payment)
//     private readonly paymentsRepository: Repository<Payment>,

//     private readonly dataSource: DataSource,
//   ) {}

//   async create({ amount }) {
//     const queryRunner = this.dataSource.createQueryRunner();
//     await queryRunner.connect();
//     await queryRunner.startTransaction('READ UNCOMMITTED');
//     try {
//       const payment = this.paymentsRepository.create({ amount });
//       await queryRunner.manager.save(payment);

//       // 5초 뒤에 특정 이유로 실패함!!!
//       setTimeout(async () => {
//         await queryRunner.rollbackTransaction();
//       }, 5000);
//     } catch (error) {
//       await queryRunner.rollbackTransaction();
//     }
//   }

//   async findAll() {
//     const queryRunner = this.dataSource.createQueryRunner();
//     await queryRunner.connect();
//     await queryRunner.startTransaction('READ UNCOMMITTED');
//     try {
//       // 만약 5초 이내에 조회하면, 위에서 등록한 금액(커밋되지 않은 금액)이 조회됨(-> dirty-read)
//       const payment = await queryRunner.manager.find(Payment);
//       await queryRunner.commitTransaction();
//       return payment;
//     } catch (error) {
//       await queryRunner.rollbackTransaction();
//     }
//   }
// }



//**** 2단계
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { DataSource, Repository } from 'typeorm';
// import { Payment } from './entities/payment.entity';

// @Injectable()
// export class PaymentsService {
//   constructor(
//     @InjectRepository(Payment)
//     private readonly paymentsRepository: Repository<Payment>,

//     private readonly dataSource: DataSource,
//   ) {}

//   async findAll() {
//     const queryRunner = this.dataSource.createQueryRunner();
//     await queryRunner.connect();
//     await queryRunner.startTransaction('READ COMMITTED');
//     try {
//       // 하나의 트랜잭션 내에서 500원이 조회됐으면,
//       // 해당 트랜잭션이 끝나기 전까지는(커밋 전까지는) 다시 조회하더라도 항상 500원이 조회(Repeatable-Read) 되어야 함
//       const payment = await queryRunner.manager.findOne(Payment, {
//         where: { id: 'd2ee2dea-816e-4aa0-9f19-e10b94ffe464' },
//         select: { amount: true },
//       });
//       console.log(`당신이 가진 돈은 ${payment.amount}원 입니다.`); // >>>>>>>>>>>>>>>> 1. 최초 금액 기록

//       const paymentTax = await queryRunner.manager.findOne(Payment, {
//         where: { id: 'd2ee2dea-816e-4aa0-9f19-e10b94ffe464' },
//         select: { amount: true, tax: true },
//       });
//       const result = paymentTax.amount - paymentTax.tax;
//       console.log(`당신이 가진 돈에서 세금을 제외하면 ${result}원 입니다.`); // >>>>>>>>>>> 2. 세금 제외한 금액 기록

//       // 여러 로직을 수행하는데 5초가 걸렸다고 가정하고, 5초 후 최종금액에서 수수료를 뺀 값을 결과로 리턴하려고 함.
//       // 이 사이에 누군가 수정하면(update), Repeatable-Read 보장되지 않음 => Non-Repeatable-Read 문제!!!
//       setTimeout(async () => {
//         const paymentCommission = await queryRunner.manager.findOne(Payment, {
//           where: { id: 'd2ee2dea-816e-4aa0-9f19-e10b94ffe464' },
//           select: { amount: true, commission: true },
//         });
//         const result = paymentCommission.amount - paymentCommission.commission;
//         console.log(`당신이 가진 돈에서 수수료를 빼면 ${result}원 입니다.`); // >>>>>>>>>>> 3. 수수료 제외한 금액 기록
//       }, 5000);
//     } catch (error) {
//       await queryRunner.rollbackTransaction();
//     }
//   }

//   async create({ amount }) {
//     const queryRunner = this.dataSource.createQueryRunner();
//     await queryRunner.connect();
//     await queryRunner.startTransaction('READ COMMITTED');
//     try {
//       // 중간에 돈 수정해보기
//       const payment = await queryRunner.manager.findOne(Payment, {
//         where: { id: 'd2ee2dea-816e-4aa0-9f19-e10b94ffe464' },
//       });
//       payment.amount = 1;
//       await queryRunner.manager.save(payment);
//       await queryRunner.commitTransaction();
//     } catch (error) {
//       await queryRunner.rollbackTransaction();
//     }
//   }
// }


//**** 2-2단계(3단계는 mysql에서 디폴트 레벨이므로 안해줘도 됨!)
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { DataSource, Repository } from 'typeorm';
// import { Payment } from './entities/payment.entity';

// @Injectable()
// export class PaymentsService {
//   constructor(
//     @InjectRepository(Payment)
//     private readonly paymentsRepository: Repository<Payment>,

//     private readonly dataSource: DataSource,
//   ) {}

//   async findAll() {
//     const queryRunner = this.dataSource.createQueryRunner();
//     await queryRunner.connect();
//     await queryRunner.startTransaction('READ COMMITTED');
//     try {
//       // 하나의 트랜잭션 내에서 1개의 데이터가 조회됐으면,
//       // 해당 트랜잭션이 끝나기 전까지는(커밋 전까지는) 다시 조회하더라도 항상 1개의 데이터가 조회 되어야 함
//       // 1초간 반복해서 조회하는 중에, 누군가 등록하면(create), 유령 데이터가 생겨남 => Phantom-Read
//       setInterval(async () => {
//         const payment = await queryRunner.manager.find(Payment);
//         console.log(payment);
//       }, 1000);
//     } catch (error) {
//       await queryRunner.rollbackTransaction();
//     }
//   }

//   async create({ amount }) {
//     const queryRunner = this.dataSource.createQueryRunner();
//     await queryRunner.connect();
//     await queryRunner.startTransaction('READ COMMITTED');
//     try {
//       // 중간에 돈 추가해보기
//       const payment = this.paymentsRepository.create({ amount });
//       await queryRunner.manager.save(payment);
//       await queryRunner.commitTransaction();
//     } catch (error) {
//       await queryRunner.rollbackTransaction();
//     }
//   }
// }

//**** 4단계(4단계는 너무 느려져서 잘 안함!)
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly dataSource: DataSource,
  ) {}

  async findAll({user}) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      // 조회시 락을 걸고 조회함으로써, 다른 쿼리에서 조회 못하게 막음(대기시킴) => Select ~ For Update
      const payment = await queryRunner.manager.find(Payment, {
        lock: { mode: 'pessimistic_write' }, // write_or_fail: 잠겼으면 관두기, partial_write: 잠긴것 패스하고 나머지 수행, for~~: postgres 전용
        where: { id: user.id },
        // where: { id: '0edb1d43-68d5-4225-a992-8b24b3c06972' }, //  where: { id: 'aas' }=>row-lock(=>특정 id만 접근못하게 잠가놓는것!)=> 이거 안써주면 전체 테이블을 다 잠가줌!
      });
      console.log(payment);

      // 처리에 5초간의 시간이 걸림을 가정!!
      setTimeout(async () => {
        await queryRunner.commitTransaction();
      }, 5000);
      return payment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    }
  }

  async create({ amount, user : _user, tax,commission }) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
     //1. PointTransaction 테이블에 거래기록 1줄 생성 & 저장
    const paymentTransaction =  this.paymentsRepository.create({
      id: _user.id,
      amount,
      tax,
      commission,
    })
      await queryRunner.manager.save(paymentTransaction)
      //2. 유저의 돈 찾아오기
      // 조회를 했을때, 바로 조회되지 않고 락이 풀릴 때 까지 대기
      const user = await queryRunner.manager.findOne(User, {
        // where: { id: '25a08866-465a-48cc-bd52-fbdb4782030e' },
        where: { id: _user.id },
        lock: { mode: 'pessimistic_write' }
      });
          //3. 유저의 돈 업데이트
   const updatedUser =  this.usersRepository.create(
    {
      ...user,
       money: user.money + amount,

    }
      )
    await queryRunner.manager.save(updatedUser)
  //   const id = user.id
  //   queryRunner.manager.increment(
  //     Payment,
  //     { id: id },
  //     // 'point',
  //     tax,
  //     amount
  // )
      console.log('========== 철수가 시도 ==========');
      console.log(Payment,amount,_user.id,_user);
      console.log('==============================');

   
      await queryRunner.commitTransaction();
      return paymentTransaction;

    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      //finally => 성공하든 실패하든 마지막에 작동하는 코드
      //release()가 없으면, commit 끝나도 connection 안끝남. but, 애러 나면 끝남!
      await  queryRunner.release() //마지막앤 꼭!! db와 연결끊어쥬기! => 안그럼 애러남!
    }  
    //==============================
  // const queryRunner = this.dataSource.createQueryRunner();
  // await queryRunner.connect();
  // await queryRunner.startTransaction('SERIALIZABLE');
  // try {
  //   // 조회를 했을때, 바로 조회되지 않고 락이 풀릴 때 까지 대기
  //   const payment = await queryRunner.manager.find(Payment, {
  //     where: { id: user.id },
  //   });
  //   console.log('========== 철수가 시도 ==========');
  //   console.log(payment);
  //   console.log('==============================');
  //   await queryRunner.commitTransaction();
  //   console.log(payment)
  //   return payment;
  // } catch (error) {
  //   await queryRunner.rollbackTransaction();
  // }
  }


  async delete({  amount, user : _user, tax,commission }) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      console.log(">......>")
      console.log(_user,Payment)
     //1. PointTransaction 테이블에 거래기록 1줄 생성 & 저장
    const paymentTransaction =  this.paymentsRepository.create({
      id: _user.id,
      amount,
      tax,
      commission,
    })
      await queryRunner.manager.save(paymentTransaction)
      //2. 유저의 돈 찾아오기
      // 조회를 했을때, 바로 조회되지 않고 락이 풀릴 때 까지 대기
      const user = await queryRunner.manager.findOne(User, {
        // where: { id: '25a08866-465a-48cc-bd52-fbdb4782030e' },
        where: { id: _user.id },
        lock: { mode: 'pessimistic_write' }
      });
          //3. 유저의 돈 업데이트
   const updatedUser =  this.usersRepository.create(
    {
      ...user,
       money: user.money - amount,

    }
      )
    await queryRunner.manager.save(updatedUser)
      console.log('========== 철수가 시도 ==========');
      console.log(Payment,amount,_user.id,_user);
      console.log('==============================');

   
      await queryRunner.commitTransaction();
      return paymentTransaction;

    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      //finally => 성공하든 실패하든 마지막에 작동하는 코드
      //release()가 없으면, commit 끝나도 connection 안끝남. but, 애러 나면 끝남!
      await  queryRunner.release() //마지막앤 꼭!! db와 연결끊어쥬기! => 안그럼 애러남!
    }  
    //==============================

  }
}
