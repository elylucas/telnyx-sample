import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ReceivedMessage } from 'src/models/telnyx.models';
import { Telnyx } from 'telnyx';

@Injectable()
export class MessageBotService {
  telnyx: any;

  constructor(private configService: ConfigService) {
    this.telnyx = Telnyx(configService.get('API_KEY'));
  }

  analyzeMessage(message: ReceivedMessage) {
    const messageText = message.data.payload.text.toLowerCase();
    let responseMessage: string;
    const words: string[] = getMessageWords(messageText);

    const includesPizza = words.includes('pizza');
    const includesIceCream = (() => {
      const iceLocation = words.indexOf('ice');
      if (iceLocation >= 0) {
        return words[iceLocation + 1] === 'cream';
      }
      return false;
    })();

    const invalidRequestMessage = `Please send either the word 'pizza' or 'ice cream' for a different response`;

    if (includesPizza && includesIceCream) {
      responseMessage = invalidRequestMessage;
    } else if (includesPizza) {
      responseMessage = 'Chicago pizza is the best';
    } else if (includesIceCream) {
      responseMessage = 'I prefer gelato';
    } else {
      responseMessage = invalidRequestMessage;
    }

    this.telnyx.messages.create({
      from: this.configService.get('PHONE_NUMBER'),
      to: message.data.payload.from.phone_number,
      text: responseMessage,
    });
  }
}
function getMessageWords(messageText: string) {
  // get all the words in an array so we can easily search for terms
  const words: string[] = [];
  messageText.split(' ').forEach((str) => {
    //replace any non alphanumeric characters with a blank string
    const word = str.replace(/[^a-zA-Z0-9]/, '').toLowerCase();
    if (word.trim() !== '') {
      words.push(word);
    }
  });
  return words;
}
