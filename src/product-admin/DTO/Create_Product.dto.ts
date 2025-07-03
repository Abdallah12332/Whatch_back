import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class Create_Product {
  @Field()
  name: string;

  @Field()
  image: string;

  @Field()
  type: string;

  @Field()
  price: number;

  @Field()
  how_many_one_buy_it: number;
}
