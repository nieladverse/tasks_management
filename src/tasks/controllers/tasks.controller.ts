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
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { Task } from '../shemas/tasks.shema';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // endpoints a crear
  // 1. crear una tarea en una lista
  // 2. obtener todas las tareas de una lista
  // 3 .

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    console.log('entre por aca');
    return this.tasksService.create(createTaskDto);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: Partial<CreateTaskDto>,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<{ message: string }> {
    return this.tasksService.delete(id);
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findById(id);
  }

  @Get('list/:listId')
  async getTasksByListId(@Param('listId') listId: string): Promise<Task[]> {
    return this.tasksService.findAllByListId(listId);
  }

  @Patch(':id/is-completed')
  async updateTaskIsCompleted(
    @Param('id') id: string,
    @Body('is_completed') isCompleted: boolean,
  ): Promise<Task> {
    return this.tasksService.updateIsCompleted(id, isCompleted);
  }

  @Get('priority-and-list')
  async getTasksByPriorityAndList(
    @Query('priority') priority: string,
    @Query('listId') listId: string,
  ): Promise<Task[]> {
    console.log("aca si")
    return this.tasksService.findByPriorityAndListId(priority, listId);
  }

  @Get('completed-status')
  async getTasksByCompletionStatus(
    @Query('listId') listId: string,
    @Query('isCompleted') isCompleted: boolean,
  ): Promise<Task[]> {
    return this.tasksService.findByCompletionStatus(listId, isCompleted);
  }
}
