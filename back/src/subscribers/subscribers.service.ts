import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Suscriptores } from './entities/subscriber.entity';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectRepository(Suscriptores) 
    private subscribersRepository: Repository<Suscriptores>
  ) {}

  // We create an event

  async create(CreateSubscriberDto: CreateSubscriberDto) {
      try {
        const newEvent = this.subscribersRepository.create({...CreateSubscriberDto,   usuario: { id: CreateSubscriberDto.usuarioId } });
        return await this.subscribersRepository.save(newEvent);
      } catch (error) {
        throw new InternalServerErrorException(`Error : ${error.message}`);
      }
    }


  async findAll(): Promise<any> {
    return this.subscribersRepository.find();
  }

  async findAndCount(): Promise<any> {
    const [data, total] = await this.subscribersRepository.findAndCount();
    return { total };
  }


  // We call all events that correspond to one manager
  
  async findAllByManager(userId: number): Promise<any> {
    return this.subscribersRepository.find({
      where: {
        usuario: { id: userId },
      },
      relations: ['usuario'], // opcional
    });
  }


  // We find the lost sheep
  
  async findOneById(id: number): Promise<Suscriptores | null> {
    return this.subscribersRepository.findOne({ where: { id } });
  }

  update(id: number, UpdateSubscriberDto: UpdateSubscriberDto) {
    return `This action updates a #${id} event`;
  }


  // we obliterate the register like a sigma

async remove(id: number) {
  try {
    const result = await this.subscribersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Evento con id ${id} no encontrado`);
    }

    return { message: `Evento con id ${id} eliminado correctamente` };
  } catch (error) {
    throw new InternalServerErrorException('Error al eliminar el evento');
  }
}


}
