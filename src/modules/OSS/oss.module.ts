import { Module } from '@nestjs/common';
import { OSSResolver } from './oss.resolver';
import { OSSService } from './oss.service';

@Module({
  imports: [],
  providers: [OSSResolver, OSSService], // 提供OSSService服务, OSSResolver
  exports: [],
})
export class OSSModule {} // 导出OSSModule类
