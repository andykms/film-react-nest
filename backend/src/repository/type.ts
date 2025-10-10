import { filmDto, sheduleDto } from '../films/dto/films.dto';
import { filmFullDto } from '../films/dto/films.dto';

export default interface IAppRepository {
  findAll(): Promise<filmDto[]>;
  findOne(id: string): Promise<filmFullDto>;
  findShedule(id: string): Promise<sheduleDto>;
  updateShedule(id: string, seat: string): Promise<sheduleDto>;
}
