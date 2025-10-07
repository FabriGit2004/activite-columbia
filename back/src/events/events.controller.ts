import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UsersService } from '../users/users.service';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
  ) {}

  @Post()   // charge body as DTO
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get() // duh
  findAllRegisters() {
    return this.eventsService.findAll();
  }

  @Get(':id')  // manager id
  findAll(@Param('id') id: string) {
    return this.eventsService.findAllByManager(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }


}
