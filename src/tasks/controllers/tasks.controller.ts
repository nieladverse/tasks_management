import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { Task } from '../shemas/tasks.shema';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Controller('tasks')
export class TasksController {
  /**
   * Initializes the controller with the TasksService dependency.
   * @param tasksService The service to handle task operations.
   */
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Creates a new task.
   * @param createTaskDto Data Transfer Object containing task details.
   * @returns The created task.
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    console.log('Entered createTask endpoint');
    return this.tasksService.create(createTaskDto);
  }

  /**
   * Updates a task by its ID.
   * @param id The ID of the task to update.
   * @param updateTaskDto Partial DTO containing the fields to update.
   * @returns The updated task.
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: Partial<CreateTaskDto>,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  /**
   * Deletes a task by its ID.
   * @param id The ID of the task to delete.
   * @returns A success message confirming the deletion.
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteTask(@Param('id') id: string): Promise<{ message: string }> {
    return this.tasksService.delete(id);
  }

  /**
   * Retrieves tasks by their priority and list ID.
   * @param priority The priority level to filter tasks by ('low', 'medium', 'high').
   * @param listId The ID of the list to filter tasks within.
   * @returns An array of tasks matching the criteria.
   */
  @Get('priority-and-list')
  @UseGuards(JwtAuthGuard)
  async getTasksByPriorityAndList(
    @Query('priority') priority: string,
    @Query('listId') listId: string,
  ): Promise<Task[]> {
    return this.tasksService.findByPriorityAndListId(priority, listId);
  }

  /**
   * Retrieves a task by its ID.
   * @param id The ID of the task to retrieve.
   * @returns The found task.
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findById(id);
  }

  /**
   * Retrieves all tasks associated with a specific list ID.
   * @param listId The ID of the list to search tasks for.
   * @returns An array of tasks linked to the list.
   */
  @Get('list/:listId')
  @UseGuards(JwtAuthGuard)
  async getTasksByListId(@Param('listId') listId: string): Promise<Task[]> {
    return this.tasksService.findAllByListId(listId);
  }

  /**
   * Updates the completion status of a task by its ID.
   * @param id The ID of the task to update.
   * @param isCompleted The new completion status of the task.
   * @returns The updated task.
   */
  @Patch(':id/is-completed')
  @UseGuards(JwtAuthGuard)
  async updateTaskIsCompleted(
    @Param('id') id: string,
    @Body('is_completed') isCompleted: boolean,
  ): Promise<Task> {
    return this.tasksService.updateIsCompleted(id, isCompleted);
  }

  /**
   * Retrieves tasks by their completion status within a specific list.
   * @param listId The ID of the list to search within.
   * @param isCompleted The completion status to filter tasks by.
   * @returns An array of tasks matching the criteria.
   */
  @Get('/status/completed-status')
  @UseGuards(JwtAuthGuard)
  async getTasksByCompletionStatus(
    @Query('listId') listId: string,
    @Query('isCompleted') isCompleted: boolean,
  ): Promise<Task[]> {
    return this.tasksService.findByCompletionStatus(listId, isCompleted);
  }
}
