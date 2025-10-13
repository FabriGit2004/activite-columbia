import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateSubscriberDto } from '../subscribers/dto/create-subscriber.dto';
import { SubscribersService } from './subscribers.service';


@Controller('subscribers')
export class SubscribersController {
  constructor(
    private readonly subscribersService: SubscribersService,
  ) {}

  @Post()   // charge body as DTO
  create(@Body() CreateSubscriberDto: CreateSubscriberDto) {
    return this.subscribersService.create(CreateSubscriberDto);
  }

  @Get() // duh
  findAllRegisters() {
    return this.subscribersService.findAll();
  }


  @Get('count') // duh
  findAllRegistersAndCount() {
    return this.subscribersService.findAndCount();
  }


  @Get(':id')  // manager id
  findAll(@Param('id') id: string) {
    return this.subscribersService.findAllByManager(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscribersService.remove(+id);
  }


}
