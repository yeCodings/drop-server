import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { DeepPartial, Repository } from 'typeorm';

/**
 * 注册 UserService服务
 *
 * @export UserService
 * @class UserService
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>, // 注入Repository<User>实例
  ) {}

  /**
   * 新增用户
   * 创建create方法，接收一个DeepPartial<User>类型的参数
   * @param {DeepPartial<User>} entity
   * @return {*}  {Promise<boolean>}
   * @memberof UserService
   */
  async create(
    entity: DeepPartial<User>,
    // 返回一个Promise对象，表示创建操作是否成功
  ): Promise<boolean> {
    const res = await this.UserRepository.insert(entity); // 通过Repository实例执行插入操作
    if (res && res.raw.affectedRows > 0) {
      return true; // 返回true，表示创建操作成功
    } else {
      return false;
    }
  }

  /**
   * 删除用户
   * 定义一个异步方法del，该方法接收一个字符串类型的参数id，并返回一个Promise类型的值
   * @param {string} id
   * @return {*}  {Promise<boolean>}
   * @memberof UserService
   */
  async del(id: string): Promise<boolean> {
    // 调用UserRepository的delete方法，传入id作为参数，并将返回值赋值给res变量
    const res = await this.UserRepository.delete(id);
    console.log('del-res', res);
    if (res.affected > 0) {
      return true; // 返回true，表示删除操作成功
    } else {
      return false;
    }
  }

  /**
   * 更新用户
   *
   * @param {string} id
   * @param {DeepPartial<User>} entity
   * @return {*}  {Promise<boolean>}
   * @memberof UserService
   */
  async update(id: string, entity: DeepPartial<User>): Promise<boolean> {
    const res = await this.UserRepository.update(id, entity);
    console.log('update-res', res);
    return true;
  }

  /**
   * 查询用户
   *
   * @param {string} id
   * @return {*}  {Promise<User>}
   * @memberof UserService
   */
  async find(id: string): Promise<User> {
    const res = await this.UserRepository.findOne({
      where: {
        id,
      },
    });
    return res;
  }
}
