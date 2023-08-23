import { Module } from '@nestjs/common';
import { OSSResolver } from './oss.resolver';
import { OSSService } from './oss.service';

@Module({
  imports: [], // 导入TypeOrmModule，并使用forFeature方法注册User实体
  providers: [OSSResolver, OSSService], // 提供ConsoleLogger服务, UserResolver
  exports: [],
})
export class OSSModule {} // 导出UserModule类
