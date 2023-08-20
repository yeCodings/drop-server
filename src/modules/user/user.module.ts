import { ConsoleLogger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // 导入TypeOrmModule，并使用forFeature方法注册User实体
  providers: [ConsoleLogger, UserService, UserResolver], // 提供ConsoleLogger服务, UserResolver
  exports: [UserService, UserResolver],
})
export class UserModule {} // 导出UserModule类
