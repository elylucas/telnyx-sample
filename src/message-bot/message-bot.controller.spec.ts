import { Test, TestingModule } from '@nestjs/testing';
import { ReceivedMessage } from 'src/models/telnyx.models';
import { MessageBotController } from './message-bot.controller';
import { MessageBotService } from './message-bot.service';

const mockMessageBotService = {
  analyzeMessage: jest.fn(),
};

describe('MessageBotController', () => {
  let controller: MessageBotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageBotController],
      providers: [MessageBotService],
    })
      .overrideProvider(MessageBotService)
      .useValue(mockMessageBotService)
      .compile();

    controller = module.get<MessageBotController>(MessageBotController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should analyze message when the message type is received', () => {
    const message: DeepPartial<ReceivedMessage> = {
      data: {
        event_type: 'message.received',
      },
    };
    controller.receiveSMSMessage(message as ReceivedMessage);
    expect(mockMessageBotService.analyzeMessage).toBeCalledWith(message);
  });

  it('should not analyze message when the message type is not received', () => {
    const message: Partial<ReceivedMessage> = {
      data: {
        event_type: 'message.sent',
      } as any,
    };
    controller.receiveSMSMessage(message as ReceivedMessage);
    expect(mockMessageBotService.analyzeMessage).not.toBeCalled();
  });
});
