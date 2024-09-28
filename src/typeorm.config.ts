import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'dodo_done.db',
  entities: [Task],
  synchronize: true,
};