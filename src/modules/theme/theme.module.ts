import { Module } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { ThemeController } from './theme.controller';
import { ThemeRepository } from 'src/repositories/theme';

@Module({
  controllers: [ThemeController],
  providers: [ThemeService, ThemeRepository],
  exports: [ThemeService],
})
export class ThemeModule {}
