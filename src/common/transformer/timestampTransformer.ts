import { ValueTransformer } from 'typeorm';

export class TimestampTransformer implements ValueTransformer {
  // 将数据库中的 Date 转换为时间戳返回给客户端
  to(entityValue: Date): number {
    return entityValue ? entityValue.getTime() : null;
  }

  // 将客户端的时间戳转换为 Date 对象存入数据库
  from(databaseValue: number): Date {
    return databaseValue ? new Date(databaseValue) : null;
  }
}
