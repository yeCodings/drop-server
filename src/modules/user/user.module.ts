import { ConsoleLogger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';

// 使用@Module装饰器定义一个模块
@Module({
  imports: [TypeOrmModule.forFeature([User])], // 导入TypeOrmModule，并使用forFeature方法注册User实体
  providers: [ConsoleLogger], // 提供ConsoleLogger服务
  exports: [],
})
export class UserModule {} // 导出UserModule类
