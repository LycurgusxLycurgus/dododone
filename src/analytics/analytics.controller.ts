import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('completion-rate')
  getCompletionRate(): Promise<number> {
    return this.analyticsService.getCompletionRate();
  }

  @Get('overdue-tasks')
  getOverdueTasks(): Promise<number> {
    return this.analyticsService.getOverdueTasks();
  }

  @Get('total-tasks')
  getTotalTasks(): Promise<number> {
    return this.analyticsService.getTotalTasks();
  }
}