import { TimestampTransformer } from 'src/common/transformer/timestampTransformer';
import { UserInfo } from 'src/common/user.entiry';
import { Entity, Column, Index } from 'typeorm';

@Entity({ name: 'performance_request' })
@Index('idx_user_search', [
  'url',
  'startTime',
  'duration',
  'status',
  'userId',
  'username',
  'ip',
  'email',
])
@Index('idx_duration', ['duration'])
export class Request extends UserInfo {
  @Column({ type: 'varchar', length: 255, comment: '接口地址' })
  url: string;

  @Column({ type: 'varchar', length: 10, comment: '接口方法' })
  method: string;

  @Column({
    name: 'start_time',
    type: 'timestamp',
    transformer: new TimestampTransformer(),
    comment: '开始时间',
  })
  startTime: number;

  @Column({
    name: 'end_time',
    type: 'timestamp',
    transformer: new TimestampTransformer(),
    comment: '开始时间',
  })
  endTime: number;

  @Column({ type: 'int', unsigned: true, comment: '接口耗时' })
  duration: number;

  @Column({ type: 'int', unsigned: true, comment: '接口状态码' })
  status: number;

  @Column({ type: 'int', unsigned: true, comment: '业务状态码' })
  code: number;

  @Column({ type: 'varchar', length: 255, comment: '异常信息' })
  message: string;

  @Column({ type: 'varchar', length: 255, comment: '业务信息' })
  msg: string;
}
