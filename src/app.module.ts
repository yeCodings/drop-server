import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // 设置数据库类型为mysql
      host: 'localhost', // 设置数据库主机地址
      port: 3306, // 设置数据库端口号
      username: 'root', // 设置数据库用户名
      password: '123456', // 设置数据库密码
      database: 'drop-server', // 设置要连接的数据库名称
      entities: [`${__dirname}/../modules/**/*.entity{.ts,.js}`], // 指定实体文件的路径，可以是.ts或.js文件
      logging: true, // 开启日志
      synchronize: true, // 开启数据库同步功能
      autoLoadEntities: true, // 自动加载实体类
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
