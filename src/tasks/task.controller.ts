import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  createTask(@Body() task: Partial<Task>): Promise<Task> {
    return this.taskService.createTask(task);
  }

  @Get()
  getTasks(): Promise<Task[]> {
    return this.taskService.getTasks();
  }

  @Put(':id')
  updateTask(@Param('id') id: number, @Body() task: Partial<Task>): Promise<void> {
    return this.taskService.updateTask(id, task);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}