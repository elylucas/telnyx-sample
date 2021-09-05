import { Module } from '@nestjs/common';
import { MessageBotService } from './message-bot/message-bot.service';
import { MessageBotController } from './message-bot/message-bot.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [MessageBotController],
  providers: [MessageBotService],
})
export class AppModule {}
