import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../shemas/tasks.shema';
import { Model } from 'mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '../dtos/create-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    console.log('solo me pregunto', createTaskDto);
    const createdTask = new this.taskModel(createTaskDto);
    createdTask.createdAt = new Date();
    createdTask.updatedAt = new Date();
    return createdTask.save();
  }

  async update(
    id: string,
    updateTaskDto: Partial<CreateTaskDto>,
  ): Promise<Task> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(
      id,
      updateTaskDto,
      {
        new: true, // Devuelve el documento actualizado
      },
    );
    if (!updatedTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return updatedTask;
  }


  async delete(id: string): Promise<{ message: string }> {
    const result = await this.taskModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return { message: `Task with id ${id} successfully deleted` };
  }


  async findById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }
  
  async findAllByListId(listId: string): Promise<Task[]> {
    return this.taskModel.find({ list_id: listId }).exec();
  }

  async updateIsCompleted(taskId: string, isCompleted: boolean): Promise<Task> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(
      taskId,
      { is_completed: isCompleted },
      { new: true },
    );
  
    if (!updatedTask) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }
  
    return updatedTask;
  }

  async findByPriorityAndListId(priority: string, listId: string): Promise<Task[]> {
    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(priority)) {
      throw new BadRequestException(`Priority must be one of: ${validPriorities.join(', ')}`);
    }
    console.log("llegue hasta aca")
    const tasks = await this.taskModel.find({ priority, list_id: listId }).exec();
    return tasks;
  }

  async findByCompletionStatus(listId: string, isCompleted: boolean): Promise<Task[]> {
    return this.taskModel.find({ list_id: listId, is_completed: isCompleted }).exec();
  }
}
