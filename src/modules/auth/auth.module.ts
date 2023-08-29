import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserService } from '../user/user.service';
import { User } from '../user/models/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JWT_SECRET } from '@/common/constants/aliyun';

@Module({
  // 要使用到User实体，需要使用TypeOrmModule.forFeature导入
  imports: [
    JwtModule.register({
      secret: JWT_SECRET, // 秘钥
      signOptions: {
        expiresIn: 60 * 60 * 24 * 7 + 's', // 过期时间
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],

  // 提供AuthService服务, AuthResolver UserService
  providers: [AuthService, AuthResolver, UserService, JwtStrategy],
  exports: [AuthService, AuthResolver],
})
export class AuthModule {} // 导出AuthModule类
