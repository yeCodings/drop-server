import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import * as dayjs from 'dayjs';
import { Result } from '@/common/dto/result.type';
import { JwtService } from '@nestjs/jwt';
import {
  ACCOUNT_NOT_EXIST,
  CODE_NOT_EXIST,
  CODE_NOT_EXPIRE,
  LOGIN_ERROR,
  SUCCESS,
} from '@/common/constants/code';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Mutation(() => Result, { description: '发送短信验证码' })
  async sendCodeMsg(@Args('tel') tel: string): Promise<Result> {
    return await this.authService.sendCodeMsg(tel);
  }

  @Mutation(() => Result, { description: '登录' })
  async login(
    @Args('tel') tel: string,
    @Args('code') code: string,
  ): Promise<Result> {
    const user = await this.userService.findByTel(tel);

    // 用户不存在
    if (!user)
      return {
        code: ACCOUNT_NOT_EXIST,
        message: '账号不存在',
      };

    // 验证码过期或不存在
    if (!user.codeCreateTimeAt || !user.code)
      return {
        code: CODE_NOT_EXIST,
        message: '验证码不存在',
      };

    // 验证码超过一小时
    if (dayjs().diff(dayjs(user.codeCreateTimeAt)) > 60 * 60 * 1000)
      return {
        code: CODE_NOT_EXPIRE,
        message: '验证码过期',
      };

    // 用户存在 且 验证码✅
    if (user.code === code) {
      const token = this.jwtService.sign({
        id: user.id,
      });
      return {
        code: SUCCESS,
        message: '登录成功',
        data: token,
      };
    }

    // 除此之外都返回false
    return {
      code: LOGIN_ERROR,
      message: '登录失败,手机号或验证码不正确',
    };
  }
}
