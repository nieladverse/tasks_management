import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskShema } from './shemas/tasks.shema';
import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks.controller';
import { TasksService } from './services/tasks.service';

@Module({
  controllers: [TasksController],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Usar variables de entorno
      signOptions: { expiresIn: '15m' },
    }),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskShema, collection: 'tasks' }]),
  ],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
