import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { CollectionRepository } from 'src/repositories/collection';

@Module({
  controllers: [CollectionController],
  providers: [CollectionService, CollectionRepository],
  exports: [CollectionService],
})
export class CollectionModule {}
