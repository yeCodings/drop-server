import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
@Entity('user') // 使用@Entity装饰器定义一个名为'user'的实体类，该实体类对应数据库中的'user'表
export class User {
  @PrimaryGeneratedColumn('uuid') // 使用@PrimaryGeneratedColumn装饰器指定主键生成策略为UUID
  id: string;

  @Column({
    comment: '昵称', // 在列定义中添加注释，说明该列的作用是存储昵称
    default: '',
  })
  @IsNotEmpty() // 在类外层确定 使用@IsNotEmpty装饰器确定该列的值不能为空
  name: string;

  @Column({
    comment: '描述信息',
    default: '',
  })
  desc: string;

  @Column({
    comment: '手机号',
    nullable: true, // 在数据库中确定  设置该列可以为空
  })
  tel: string;

  @Column({
    comment: '密码',
    nullable: true,
  })
  password: string;

  @Column({
    comment: '',
    nullable: true,
  })
  account: string;
}
