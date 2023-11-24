import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver, Query, Args, Context, Int } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { Payment } from './entities/payment.entity';
import { PaymentsService } from './payments.service';

@Resolver()
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) { }

  @UseGuards(GqlAuthGuard('myAuthorization'))
  @Mutation(() => Payment)
  createPayment(
    @Args({name: 'amount', type: () => Int}) amount: number, //
    @Args('tax') tax: number, //
    @Args('commission') commission: number, //
    @Context() context: IContext,
  ) {
    const user = context.req.user
    return this.paymentsService.create({ amount, user, tax, commission });
  }

  @UseGuards(GqlAuthGuard('myAuthorization'))
  @Query(() => [Payment])
  fetchPayments(
    @Context() context: IContext,
  ) {
    const user = context.req.user
    return this.paymentsService.findAll({user});
  }

  @UseGuards(GqlAuthGuard('myAuthorization'))
  @Mutation(() => Payment)
  cancelPayment(
    @Args('amount') amount: number, //
    @Args('tax') tax: number, //
    @Args('commission') commission: number, //
    @Context() context: IContext,
  ) {
    const user = context.req.user
    return this.paymentsService.delete({  amount, user, tax, commission  });
  }

}
