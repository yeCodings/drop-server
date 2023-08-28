import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
// 保护路由，防止未经授权的用户访问。继承自 `AuthGuard` 类，并使用 `jwt` 认证方式
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    // 获取请求对象，把 request 从Graphql的方式转换成 JWT方式的request
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
