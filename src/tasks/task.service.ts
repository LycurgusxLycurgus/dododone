import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  createTask(task: Partial<Task>): Promise<Task> {
    const newTask = this.taskRepository.create(task);
    return this.taskRepository.save(newTask);
  }

  getTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  updateTask(id: number, task: Partial<Task>): Promise<void> {
    return this.taskRepository.update(id, task).then(() => {});
  }

  deleteTask(id: number): Promise<void> {
    return this.taskRepository.delete(id).then(() => {});
  }
}