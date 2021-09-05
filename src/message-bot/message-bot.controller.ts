import { Body, Controller, Post } from '@nestjs/common';
import type { ReceivedMessage } from 'src/models/telnyx.models';
import { MessageBotService } from './message-bot.service';

@Controller()
export class MessageBotController {
  constructor(private messageBotService: MessageBotService) {}

  @Post()
  public receiveSMSMessage(@Body() incomingMessage: ReceivedMessage) {
    console.log('Message received:', JSON.stringify(incomingMessage));

    if (incomingMessage.data.event_type === 'message.received') {
      this.messageBotService.analyzeMessage(incomingMessage);
    }
  }
}
