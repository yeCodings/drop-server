import { Controller, Get } from '@nestjs/common';
import { UserService } from './modules/user/user.service';
import { User } from './modules/user/models/user.entity';

/**
 * 使用@Controller装饰器标记该类为控制器
 *
 * 定义一个名为AppController的控制器类
 * @export
 * @class AppController
 */
@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {} // 在构造函数中注入UserService实例，并将其声明为只读属性

  /**
   * 使用@Get装饰器定义一个GET请求的路由，路径为'/create'
   *
   * 定义一个异步方法create，该方法返回一个Promise类型的值
   *
   * 调用UserService的create方法，并传入一个包含用户信息的对象作为参数
   * @return {*}  {Promise<boolean>}
   * @memberof AppController
   */
  @Get('/create')
  async create(): Promise<boolean> {
    return await this.userService.create({
      name: '绝命码师超级管理员', // 用户名为'绝命码师超级管理员'
      desc: '管理员', // 描述信息为'管理员'
      tel: '88488848', // 手机号为'88488848'
      password: '123456', // 密码为'123456'
      account: 'admin', // 账户名为'admin'
    });
  }

  /**
   * 删除用户
   *
   * @param {string} id
   * @return {*}  {Promise<boolean>}
   * @memberof AppController
   */
  @Get('/del')
  async del(id: string): Promise<boolean> {
    return await this.userService.del('944b05e9-f00d-427d-8be5-4ef60e371d62');
  }

  /**
   * 更新用户
   *
   * @return {*}  {Promise<boolean>}
   * @memberof AppController
   */
  @Get('/update')
  async update(): Promise<boolean> {
    return await this.userService.update(
      'd23f34f2-0ccc-468e-900e-b3190ae401e2',
      {
        name: '绝命码师超级管理员111',
      },
    );
  }

  /**
   * 查询用户
   *
   * @param {string} id
   * @return {*}  {Promise<User>}
   * @memberof AppController
   */
  @Get('/find')
  async find(id: string): Promise<User> {
    return await this.userService.find('d23f34f2-0ccc-468e-900e-b3190ae401e2');
  }
}
