import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { OSSModule } from './modules/OSS/oss.module';

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
    // 导入GraphQLModule，用于在NestJS中集成GraphQL
    // 使用forRoot方法创建一个根级别的GraphQL模块，并传入一个对象作为参数
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // 指定使用的驱动程序为ApolloDriver，它是一个用于与GraphQL服务器通信的库
      driver: ApolloDriver,

      // 自动生成GraphQL模式文件，如果为false则手动指定模式文件路径
      autoSchemaFile: './schema.gql',
    }),
    UserModule,
    OSSModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
