import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserDtoC {
  @Field()
  username: string;

  @Field()
  reel_username: string;

  @Field()
  password: string;

  @Field({ defaultValue: 'user' })
  role: string;
}
