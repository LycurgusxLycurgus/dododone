import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'dodo_done.db',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};