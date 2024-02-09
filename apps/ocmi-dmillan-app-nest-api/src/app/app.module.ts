import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [ModulesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
