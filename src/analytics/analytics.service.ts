import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm'; // Add LessThan import
import { Task } from '../tasks/task.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getCompletionRate(): Promise<number> {
    const totalTasks = await this.taskRepository.count();
    const completedTasks = await this.taskRepository.count({ where: { completed: true } });
    return (completedTasks / totalTasks) * 100;
  }

  async getOverdueTasks(): Promise<number> {
    const now = new Date();
    return this.taskRepository.count({ where: { dueDate: LessThan(now), completed: false } });
  }

  async getTotalTasks(): Promise<number> {
    return this.taskRepository.count();
  }
}