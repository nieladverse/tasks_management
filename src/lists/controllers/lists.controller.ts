import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ListsService } from '../services/lists.service';
import { CreateListDto } from '../dtos/create-list.dto';

@Controller('lists')
export class ListController {
  constructor(private readonly listsService: ListsService) {}

  // Crear una lista
  @Post()
  create(@Body() createListDto: CreateListDto) {
    return this.listsService.create(createListDto);
  }

  // Obtener todas las listas de un usuario
  @Get('user/:userId')
  findAll(@Param('userId') userId: string) {
    return this.listsService.findAll(userId);
  }

  // Obtener detalles de una lista por su ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listsService.findOne(id);
  }

  // Actualizar una lista
  @Put(':id')
  update(@Param('id') id: string, @Body() updateListDto: Partial<CreateListDto>) {
    return this.listsService.update(id, updateListDto);
  }

  // Eliminar una lista
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listsService.remove(id);
  }
}
