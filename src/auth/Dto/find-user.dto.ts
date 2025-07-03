import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class FindUserInput {
  @Field(() => ID)
  id: number;
}
