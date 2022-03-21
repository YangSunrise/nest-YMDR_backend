import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
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
  @Column({ type: 'simple-array' })
  authority?: string[];
  @CreateDateColumn()
  create_time: Date;
  @Column({ default: 0, comment: '性别' })
  sex: 0 | 1;
  @UpdateDateColumn({ comment: '最后更新时间' })
  updateTime: Date;
  @OneToMany(() => UserAuth, (Auth) => Auth.user)
  Auth: UserAuth[];

}
