import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Eventos } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Eventos) 
    private eventsRepository: Repository<Eventos>
  ) {}

  // We create an event

  async create(createEventDto: CreateEventDto) {
      try {
        const newEvent = this.eventsRepository.create({...createEventDto,   usuario: { id: createEventDto.usuarioId } });
        return await this.eventsRepository.save(newEvent);
      } catch (error) {
        throw new InternalServerErrorException(`Error : ${error.message}`);
      }
    }


  async findAll(): Promise<any> {
    return this.eventsRepository.find();
  }

  async findAndCount(): Promise<any> {
    const [data, total] = await this.eventsRepository.findAndCount();
    return { total };
  }


  // We call all events that correspond to one manager

  async findAllByManager(userId: number): Promise<any> {
    return this.eventsRepository.find({
      where: {
        usuario: { id: userId },
      },
      relations: ['usuario'], // opcional
    });
  }


  // We find the lost sheep
  
  async findOneById(id: number): Promise<Eventos | null> {
    return this.eventsRepository.findOne({ where: { id } });
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }


  // we obliterate the register like a sigma

async remove(id: number) {
  try {
    const result = await this.eventsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Evento con id ${id} no encontrado`);
    }

    return { message: `Evento con id ${id} eliminado correctamente` };
  } catch (error) {
    throw new InternalServerErrorException('Error al eliminar el evento');
  }
}


}
