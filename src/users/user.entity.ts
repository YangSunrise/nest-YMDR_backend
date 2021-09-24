import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserAuth } from './userAuth.entity';
/* 用户表 */
@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ comment: '昵称' })
  nickname: string;
  @Column({ comment: '头像' })
  avatar: string;
  @Column({ default: true, comment: '是否已注销' })
  isActive: boolean;
  @Column({ update: false, comment: '创建时间', type: 'datetime' })
  create_time: string;
  @Column({ default: 0, comment: '性别' })
  sex: 0 | 1;
  @Column({ comment: '最后更新时间' })
  modification_time: string;
  @OneToMany(() => UserAuth, (Auth) => Auth.user)
  Auth: UserAuth[];
}
