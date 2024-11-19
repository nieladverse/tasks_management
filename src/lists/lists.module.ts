import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { List, ListShema } from './shemas/lists.shema';
import { ListController } from './controllers/lists.controller';
import { ListsService } from './services/lists.service';

@Module({
  controllers: [ListController],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Usar variables de entorno
      signOptions: { expiresIn: '15m' },
    }),
    MongooseModule.forFeature([
      { name: List.name, schema: ListShema, collection: 'lists' },
    ]),
  ],
  providers: [ListsService],
  exports: [ListsService],
})
export class ListsModule {}
