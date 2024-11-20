import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ListsService } from '../services/lists.service';
import { CreateListDto } from '../dtos/create-list.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Controller('lists')
export class ListController {
  /**
   * Initializes the controller with the ListsService.
   * @param listsService The service to handle list-related operations.
   */
  constructor(private readonly listsService: ListsService) {}

  /**
   * Creates a new list.
   * @param createListDto Data Transfer Object containing the details of the list.
   * @returns The created list.
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createListDto: CreateListDto) {
    return this.listsService.create(createListDto);
  }

  /**
   * Retrieves all lists for a specific user.
   * @param userId The ID of the user to retrieve lists for.
   * @returns An array of the user's lists.
   */
  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  findAll(@Param('userId') userId: string) {
    return this.listsService.findAll(userId);
  }

  /**
   * Retrieves a single list by its ID.
   * @param id The ID of the list to retrieve.
   * @returns The found list.
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.listsService.findOne(id);
  }

  /**
   * Updates a list by its ID.
   * @param id The ID of the list to update.
   * @param updateListDto Partial DTO containing the fields to update.
   * @returns The updated list.
   */
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateListDto: Partial<CreateListDto>,
  ) {
    return this.listsService.update(id, updateListDto);
  }

  /**
   * Deletes a list by its ID.
   * @param id The ID of the list to delete.
   * @returns The deleted list.
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.listsService.remove(id);
  }
}
