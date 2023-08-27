import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserService } from '../user/user.service';
import { User } from '../user/models/user.entity';

@Module({
  // 要使用到User实体，需要使用TypeOrmModule.forFeature导入
  imports: [TypeOrmModule.forFeature([User])],

  // 提供AuthService服务, AuthResolver UserService
  providers: [AuthService, AuthResolver, UserService],
  exports: [AuthService, AuthResolver],
})
export class AuthModule {} // 导出AuthModule类
