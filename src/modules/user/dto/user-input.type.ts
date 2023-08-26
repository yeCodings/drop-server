import { Field, InputType } from '@nestjs/graphql';

// 使用InputType装饰器，表示下面的类将作为GraphQL的输入类型
@InputType()
export class UserInput {
  // 使用Field装饰器，表示下面的属性将作为GraphQL查询中的字段
  @Field({ description: '名称' })
  name: string;

  @Field({ description: '简介' })
  desc: string;
}
