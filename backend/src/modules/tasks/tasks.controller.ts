import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Post()
  create(@Body() task: Task): Promise<Task> {
    return this.tasksService.create(task);
  }

  @Put(':id/time')
  update(@Param('id') id: number, @Body() updatedTask: Partial<Task>): Promise<Task> {
    return this.tasksService.updateTask(id, updatedTask);
  }
}
