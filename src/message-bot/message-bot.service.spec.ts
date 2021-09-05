import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ReceivedMessage } from 'src/models/telnyx.models';
import { Telnyx } from 'telnyx';
import { MessageBotService } from './message-bot.service';

const telnyxMessages = {
  create: jest.fn(),
};

jest.mock('telnyx', () => {
  return {
    Telnyx: (_: string) => {
      return {
        messages: telnyxMessages,
      };
    },
  };
});

describe('MessageBotService', () => {
  let service: MessageBotService;

  const mockConfigService = {
    get: jest.fn().mockImplementation((key: string) => {
      return key === 'API_KEY' ? 'abc123' : '+12222222222';
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageBotService, ConfigService],
    })
      .overrideProvider(ConfigService)
      .useValue(mockConfigService)
      .compile();

    service = module.get<MessageBotService>(MessageBotService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('pizza tests', () => {
    const expectedTerm = 'Chicago pizza is the best';
    it(`when message contains the word "pizza", it should respond with the term '${expectedTerm}'`, () => {
      const message = getRecievedMessageWithText('i like pizza');
      service.analyzeMessage(message);
      expect(telnyxMessages.create).toBeCalledWith(
        getTelnyxMessageWithText(expectedTerm),
      );
    });

    it(`when message contains the word "Pizza", it should respond with the term '${expectedTerm}'`, () => {
      const message = getRecievedMessageWithText('i like Pizza');
      service.analyzeMessage(message);
      expect(telnyxMessages.create).toBeCalledWith(
        getTelnyxMessageWithText(expectedTerm),
      );
    });

    it(`when message contains the word "pizza!", it should respond with the term '${expectedTerm}'`, () => {
      const message = getRecievedMessageWithText('i like pizza!');
      service.analyzeMessage(message);
      expect(telnyxMessages.create).toBeCalledWith(
        getTelnyxMessageWithText(expectedTerm),
      );
    });
  });

  describe('ice cream tests', () => {
    const expectedTerm = 'I prefer gelato';
    it(`when message contains the word "ice cream", it should respond with the term '${expectedTerm}'`, () => {
      const message = getRecievedMessageWithText('i like ice cream');
      service.analyzeMessage(message);
      expect(telnyxMessages.create).toBeCalledWith(
        getTelnyxMessageWithText(expectedTerm),
      );
    });

    it(`when message contains the word "Ice Cream", it should respond with the term '${expectedTerm}'`, () => {
      const message = getRecievedMessageWithText('i like Ice Cream');
      service.analyzeMessage(message);
      expect(telnyxMessages.create).toBeCalledWith(
        getTelnyxMessageWithText(expectedTerm),
      );
    });

    it(`when message contains the word "ice   cream", it should respond with the term '${expectedTerm}'`, () => {
      const message = getRecievedMessageWithText('i like ice   cream');
      service.analyzeMessage(message);
      expect(telnyxMessages.create).toBeCalledWith(
        getTelnyxMessageWithText(expectedTerm),
      );
    });
  });

  describe('pizza and ice cream tests', () => {
    const expectedTerm = `Please send either the word 'pizza' or 'ice cream' for a different response`;
    it(`when message contains the word "pizza and ice cream", it should respond with the term '${expectedTerm}'`, () => {
      const message = getRecievedMessageWithText('i like pizza and ice cream');
      service.analyzeMessage(message);
      expect(telnyxMessages.create).toBeCalledWith(
        getTelnyxMessageWithText(expectedTerm),
      );
    });
  });

  describe('niether pizza or ice cream tests', () => {
    const expectedTerm = `Please send either the word 'pizza' or 'ice cream' for a different response`;
    it(`when message does not contain the terms pizza or ice cream, it should respond with the term '${expectedTerm}'`, () => {
      const message = getRecievedMessageWithText('i like cake');
      service.analyzeMessage(message);
      expect(telnyxMessages.create).toBeCalledWith(
        getTelnyxMessageWithText(expectedTerm),
      );
    });

    it(`when message is empty, it should respond with the term '${expectedTerm}'`, () => {
      const message = getRecievedMessageWithText('');
      service.analyzeMessage(message);
      expect(telnyxMessages.create).toBeCalledWith(
        getTelnyxMessageWithText(expectedTerm),
      );
    });

    it(`when message is contains the term 'cream ice', it should respond with the term '${expectedTerm}'`, () => {
      const message = getRecievedMessageWithText('i like cream ice');
      service.analyzeMessage(message);
      expect(telnyxMessages.create).toBeCalledWith(
        getTelnyxMessageWithText(expectedTerm),
      );
    });
  });
});

function getRecievedMessageWithText(text: string): ReceivedMessage {
  const message: DeepPartial<ReceivedMessage> = {
    data: {
      event_type: 'message.received',
      payload: {
        text,
        from: {
          phone_number: '+15555555555',
        },
      },
    },
  };
  return message as ReceivedMessage;
}

function getTelnyxMessageWithText(text: string) {
  return {
    from: expect.any(String),
    to: expect.any(String),
    text,
  };
}
