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
export class Router {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ comment: '昵称' })
  name: string;
  @Column({ comment: '路径' })
  path: string;
  @Column({ comment: '描述' })
  description: string;
  @Column({ comment: '路由路径' })
  url: string;
  @Column({ comment: '图标' })
  icon: string;
}
