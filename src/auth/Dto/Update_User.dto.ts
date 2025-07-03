import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserDtoU {
  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  reel_username?: string;

  @Field({ nullable: true })
  password?: string;
}
