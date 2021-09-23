import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
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
  @Column({ update: false, comment: '创建时间' })
  create_time: Date;
  @Column({ default: 0, comment: '性别' })
  sex: 0 | 1;
  @Column({ comment: '最后更新时间' })
  modification_time: Date;
  @OneToMany(() => UserAuth, (Auth) => Auth.user)
  Auth: UserAuth[];
}
/** 用户登录权限验证 */
@Entity()
export class UserAuth {
  @PrimaryGeneratedColumn()
  id: string;
  @ManyToOne(() => Users, (user) => user.id)
  user: string;
  @Column({ comment: '标识符类别' })
  identity_type: string;
  @Column({ comment: '标识符' })
  identifier: string;
  @Column({ comment: '凭证' })
  credential: string;
}
