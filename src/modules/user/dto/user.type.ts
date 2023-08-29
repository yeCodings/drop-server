import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field({ description: '用户id' })
  id?: string;

  @Field({ description: '用户名称' })
  name?: string;

  @Field({ description: '用户描述' })
  desc: string;

  @Field({ description: '账户信息' })
  account: string;

  @Field({ description: 'tel' })
  tel: string;
}
