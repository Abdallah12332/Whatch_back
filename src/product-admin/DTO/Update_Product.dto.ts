import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class Update_Product {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  how_many_one_buy_it?: number;
}
