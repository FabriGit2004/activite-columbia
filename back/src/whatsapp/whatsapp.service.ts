import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);

  async sendHelloWorld(toPhone: string): Promise<any> {
    const url = 'https://graph.facebook.com/v22.0/832028006657123/messages';
    const token =
      process.env.ACCESS_TOKEN || '';

    try {
      const response = await axios.post(
        url,
        {
          messaging_product: 'whatsapp',
          to: toPhone, // por ejemplo: '+595981530531'
          type: 'template',
          template: {
            name: 'hello_world',
            language: { code: 'en_US' },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      this.logger.log(`✅ Mensaje enviado correctamente a ${toPhone}`);
      return response.data;
    } catch (error: any) {
      this.logger.error(
        `❌ Error al enviar mensaje a ${toPhone}: ${error.response?.status} - ${error.response?.data?.error?.message || error.message}`,
      );
      throw error;
    }
  }
}
