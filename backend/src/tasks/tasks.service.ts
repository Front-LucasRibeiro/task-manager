import { Injectable } from '@nestjs/common';
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
}
