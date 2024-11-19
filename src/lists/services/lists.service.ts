import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { List } from '../shemas/lists.shema';
import { CreateListDto } from '../dtos/create-list.dto';

@Injectable()
export class ListsService {
  constructor(@InjectModel(List.name) private listModel: Model<List>) {}

  // Crear una lista
  async create(createListDto: CreateListDto): Promise<List> {
    const createdList = new this.listModel(createListDto);
    createdList.createdAt = new Date();
    createdList.updatedAt = new Date();
    return createdList.save();
  }

  // Obtener todas las listas de un usuario
  async findAll(userId: string): Promise<List[]> {
    return this.listModel.find({ user_id: userId }).exec();
  }

  // Obtener una lista por su ID
  async findOne(id: string): Promise<List> {
    return this.listModel.findById(id).exec();
  }

  // Actualizar una lista
  async update(id: string, updateListDto: Partial<CreateListDto>): Promise<List> {
    const updateData: any = updateListDto
    updateData.updatedAt = new Date();
    return this.listModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  // Eliminar una lista
  async remove(id: string): Promise<List> {
    return this.listModel.findByIdAndDelete(id).exec();
  }
}
