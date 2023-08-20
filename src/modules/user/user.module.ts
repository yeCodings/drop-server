import { ConsoleLogger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // 导入TypeOrmModule，并使用forFeature方法注册User实体
  providers: [ConsoleLogger, UserService], // 提供ConsoleLogger服务
  exports: [UserService],
})
export class UserModule {} // 导出UserModule类
