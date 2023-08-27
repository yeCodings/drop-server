import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import * as dayjs from 'dayjs';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Boolean, { description: '发送短信验证码' })
  async sendCodeMsg(@Args('tel') tel: string): Promise<boolean> {
    return await this.authService.sendCodeMsg(tel);
  }

  @Mutation(() => Boolean, { description: '登录' })
  async login(
    @Args('tel') tel: string,
    @Args('code') code: string,
  ): Promise<boolean> {
    const user = await this.userService.findByTel(tel);

    // 用户不存在
    if (!user) return false;

    // 验证码过期或不存在
    if (!user.codeCreateTimeAt || !user.code) return false;

    // 验证码超过一小时
    if (dayjs().diff(dayjs(user.codeCreateTimeAt)) > 60 * 60 * 1000)
      return false;

    // 用户存在 且 验证码✅
    if (user.code === code) return true;

    // 除此之外都返回false
    return false;
  }
}
