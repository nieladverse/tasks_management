import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { List } from '../shemas/lists.shema';
import { CreateListDto } from '../dtos/create-list.dto';

@Injectable()
export class ListsService {
  /**
   * Initializes the service with the List model.
   * @param listModel The Mongoose model for the List schema.
   */
  constructor(@InjectModel(List.name) private listModel: Model<List>) {}

  /**
   * Creates a new list.
   * @param createListDto Data Transfer Object containing list details.
   * @returns The created list.
   */
  async create(createListDto: CreateListDto): Promise<List> {
    const createdList = new this.listModel(createListDto);
    createdList.createdAt = new Date();
    createdList.updatedAt = new Date();
    return createdList.save();
  }

  /**
   * Retrieves all lists for a specific user.
   * @param userId The ID of the user to retrieve lists for.
   * @returns An array of lists associated with the user.
   */
  async findAll(userId: string): Promise<List[]> {
    return this.listModel.find({ user_id: userId }).exec();
  }

  /**
   * Retrieves a single list by its ID.
   * @param id The ID of the list to retrieve.
   * @returns The found list.
   */
  async findOne(id: string): Promise<List> {
    return this.listModel.findById(id).exec();
  }

  /**
   * Updates a list by its ID.
   * @param id The ID of the list to update.
   * @param updateListDto Partial DTO containing the fields to update.
   * @returns The updated list.
   */
  async update(
    id: string,
    updateListDto: Partial<CreateListDto>,
  ): Promise<List> {
    const updateData: any = updateListDto;
    updateData.updatedAt = new Date();
    return this.listModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  /**
   * Deletes a list by its ID.
   * @param id The ID of the list to delete.
   * @returns The deleted list.
   */
  async remove(id: string): Promise<List> {
    return this.listModel.findByIdAndDelete(id).exec();
  }
}
