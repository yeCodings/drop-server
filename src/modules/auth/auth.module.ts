import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [],
  providers: [AuthService, AuthResolver], // 提供AuthService服务, AuthResolver
  exports: [AuthService, AuthResolver],
})
export class AuthModule {} // 导出AuthModule类
