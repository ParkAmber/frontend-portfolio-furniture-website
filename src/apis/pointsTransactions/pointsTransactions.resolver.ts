import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointsTransactionsService } from './pointsTransactions.service';

@Resolver()
export class PointsTransactionsResolver {
  constructor(
    private readonly pointsTransactionsService: PointsTransactionsService,
  ) {}

  @UseGuards(GqlAuthGuard('myAuthorization'))
  @Mutation(() => PointTransaction)
  createPointTransaction(
    @Args('impUid') impUid: string, //
    @Args({ name: "amount", type: () => Int }) amount: number,
    @Context() context: IContext,

  ): Promise<PointTransaction> {
    const user = context.req.user
    return this.pointsTransactionsService.createForPayment({ impUid, amount, user,  });
  }

  @UseGuards(GqlAuthGuard('myAuthorization'))
  @Mutation(() => PointTransaction)
  cancelPointTransaction(
    @Args('impUid') impUid: string,
    @Context() context: IContext,
  ) {
    const user = context.req.user;
   return this.pointsTransactionsService.cancel({impUid, user})
  }

  @UseGuards(GqlAuthGuard('myAuthorization'))
  @Query(()=> [PointTransaction]) 
  fetchPointTransaction() {
   return this.pointsTransactionsService.findAll()
  }
}
