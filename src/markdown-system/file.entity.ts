import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
/* markdown类型表 */
@Entity()
export class MarkdownFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ comment: '昵称' })
  name: string;
  @Column({ comment: '文件类型' })
  node_type: 'folder' | 'md';
  @Column({ default: false, comment: '是否收藏文件' })
  isCollection: boolean;
  @Column({ default: true, comment: '是否删除' })
  isActive: boolean;
  @Column({ comment: '拥有者的id' })
  owner_id: string;
  @Column({ default: false, comment: '是否作为博客内容应用' })
  isBlogs: boolean;
  @CreateDateColumn({ comment: '创建时间' })
  create_time: Date;
  @UpdateDateColumn({ comment: '最后更新时间' })
  updateTime: Date;
  @Column({ comment: '文件url' })
  url?: string;
  @Column({ comment: '父节点id', default: null })
  parentNode_id: string;
  @Column({ comment: 'NodeList', type: 'simple-array' })
  node_list?: string;
}
