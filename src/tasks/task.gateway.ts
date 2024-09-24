import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'ws';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@WebSocketGateway()
export class TaskGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly taskService: TaskService) {}

  @SubscribeMessage('createTask')
  async handleCreateTask(@MessageBody() task: Partial<Task>): Promise<void> {
    const newTask = await this.taskService.createTask(task);
    this.server.emit('taskCreated', newTask);
  }

  @SubscribeMessage('updateTask')
  async handleUpdateTask(@MessageBody() task: Partial<Task>): Promise<void> {
    await this.taskService.updateTask(task.id, task);
    this.server.emit('taskUpdated', task);
  }

  @SubscribeMessage('deleteTask')
  async handleDeleteTask(@MessageBody() id: number): Promise<void> {
    await this.taskService.deleteTask(id);
    this.server.emit('taskDeleted', id);
  }
}