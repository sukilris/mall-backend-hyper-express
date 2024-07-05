import { AbstractEntity } from 'src/common/abstract.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'performance_request' })
export abstract class UserInfo extends AbstractEntity {
  @Column({ name: 'user_id', type: 'varchar', length: 50, comment: '用户ID' })
  userId: string;

  @Column({ type: 'varchar', length: 50, comment: '用户名称' })
  username: string;

  @Column({ type: 'varchar', length: 20, comment: '用户IP' })
  ip: string;

  @Column({ type: 'varchar', length: 255, comment: '用户邮箱' })
  email: string;

  @Column({
    type: 'tinyint',
    comment: '客户端标识：0-PC 1-PC-PWA 2-MOBILE 3-MOBILE-PWA 4-TMA',
  })
  mode: string;

  @Column({ type: 'varchar', length: 255, comment: 'User-Agent' })
  ua: string;

  @Column({ type: 'varchar', length: 20, comment: '浏览器' })
  browser: string;

  @Column({ type: 'varchar', length: 20, comment: '浏览器版本' })
  browserVersion: string;

  @Column({ type: 'varchar', length: 20, comment: '系统' })
  os: string;

  @Column({ type: 'varchar', length: 20, comment: '系统版本' })
  osVersion: string;

  @Column({ type: 'varchar', length: 20, comment: '设备' })
  device: string;

  @Column({ type: 'varchar', length: 20, comment: '品牌' })
  vendor: string;

  @Column({ type: 'varchar', length: 20, comment: '引擎' })
  engine: string;

  @Column({ type: 'varchar', length: 20, comment: '引擎版本吧' })
  engineVersion: string;
}
