import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './tasks/task.module';
import { AnalyticsModule } from './analytics/analytics.module'; // Ensure this path is correct
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TaskModule,
    AnalyticsModule,
    AuthModule,
  ],
})
export class AppModule {}
