import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from './user.entity';

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
