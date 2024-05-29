import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) { }

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  create(task: Task): Promise<Task> {
    return this.tasksRepository.save(task);
  }

  async updateTask(id: number, updatedTask: Partial<Task>): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    Object.assign(task, updatedTask);
    return this.tasksRepository.save(task);
  }
}
