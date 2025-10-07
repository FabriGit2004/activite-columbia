import { Controller, Post, Body } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Post('send-hello')
  async sendHello(@Body('toPhone') toPhone: string) {
    return this.whatsappService.sendHelloWorld(toPhone);
  }
}
