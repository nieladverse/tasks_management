import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../shemas/tasks.shema';
import { Model } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from '../dtos/create-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  /**
   * Creates a new task in the database.
   * @param createTaskDto Data Transfer Object containing the task details.
   * @returns The created task.
   */
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    createdTask.createdAt = new Date();
    createdTask.updatedAt = new Date();
    return createdTask.save();
  }

  /**
   * Updates a task with the given ID.
   * @param id The ID of the task to update.
   * @param updateTaskDto Partial DTO containing the fields to update.
   * @returns The updated task.
   */
  async update(
    id: string,
    updateTaskDto: Partial<CreateTaskDto>,
  ): Promise<Task> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(
      id,
      updateTaskDto,
      {
        new: true, // Returns the updated document.
      },
    );
    if (!updatedTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return updatedTask;
  }

  /**
   * Deletes a task with the given ID.
   * @param id The ID of the task to delete.
   * @returns A success message confirming the deletion.
   */
  async delete(id: string): Promise<{ message: string }> {
    const result = await this.taskModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return { message: `Task with id ${id} successfully deleted` };
  }

  /**
   * Finds a task by its ID.
   * @param id The ID of the task to retrieve.
   * @returns The found task.
   */
  async findById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  /**
   * Retrieves all tasks associated with a specific list ID.
   * @param listId The ID of the list to search tasks for.
   * @returns An array of tasks linked to the list.
   */
  async findAllByListId(listId: string): Promise<Task[]> {
    return this.taskModel.find({ list_id: listId }).exec();
  }

  /**
   * Updates the completion status of a task.
   * @param taskId The ID of the task to update.
   * @param isCompleted The new completion status of the task.
   * @returns The updated task.
   */
  async updateIsCompleted(taskId: string, isCompleted: boolean): Promise<Task> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(
      taskId,
      { is_complete: isCompleted },
      { new: true, runValidators: true },
    );

    if (!updatedTask) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }

    return updatedTask;
  }

  /**
   * Finds tasks based on priority and list ID.
   * @param priority The priority level to filter tasks by ('low', 'medium', 'high').
   * @param listId The ID of the list to search within.
   * @returns An array of tasks matching the criteria.
   */
  async findByPriorityAndListId(
    priority: string,
    listId: string,
  ): Promise<Task[]> {
    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(priority)) {
      throw new BadRequestException(
        `Priority must be one of: ${validPriorities.join(', ')}`,
      );
    }
    const tasks = await this.taskModel
      .find({ priority, list_id: listId })
      .exec();
    return tasks;
  }

  /**
   * Retrieves tasks based on their completion status within a list.
   * @param listId The ID of the list to search within.
   * @param isCompleted The completion status to filter tasks by.
   * @returns An array of tasks matching the criteria.
   */
  async findByCompletionStatus(
    listId: string,
    isCompleted: boolean,
  ): Promise<Task[]> {
    return this.taskModel
      .find({ list_id: listId, is_complete: isCompleted })
      .exec();
  }
}
