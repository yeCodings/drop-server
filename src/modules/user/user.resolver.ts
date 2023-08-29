import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserInput } from './dto/user-input.type';
import { UserType } from './dto/user.type';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => Boolean, { description: '新增用户' })
  async create(@Args('params') params: UserInput): Promise<boolean> {
    return await this.userService.create(params);
  }

  @Query(() => UserType, { description: '根据ID查询用户' })
  async find(@Args('id') id: string): Promise<UserType> {
    return await this.userService.find(id);
  }

  @Query(() => UserType, { description: '根据ID获取用户信息' })
  async getUserInfo(@Context() ctx: any): Promise<UserType> {
    // user?.id 避免未能及时获取到 id
    const id = ctx.req.user?.id;
    return await this.userService.find(id);
  }

  @Mutation(() => Boolean, { description: '更新用户' })
  async update(
    @Args('id') id: string,
    @Args('params') params: UserInput,
  ): Promise<boolean> {
    return await this.userService.update(id, params);
  }

  @Mutation(() => Boolean, { description: '删除一个用户' })
  async del(@Args('id') id: string): Promise<boolean> {
    return await this.userService.del(id);
  }
}
